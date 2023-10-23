import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 2.5;
scene.rotateZ(0.25);

const controls = new ArcballControls(camera, renderer.domElement, scene);
controls.setGizmosVisible(false);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
});

async function createVis() {
    let data = await d3.csv("./rats.csv")
    data.forEach(d => {
        d.Month = parseInt(d.Month);
        d.Year = parseInt(d.Year);
        d.Count = parseInt(d.Count);
    });
    data.sort((a, b) => a.Year - b.Year || a.Month - b.Month);

    let maxCount = d3.max(data, d => d.Count);
    let scaleMax = 0;
    while (scaleMax < maxCount) {
        scaleMax += 500;
    }
    scaleMax -= 500;

    let radialScale = d3.scaleLinear()
        .domain([0, scaleMax])
        .range([0, 1]);
    let zScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([-0.5, 0.5]);

    function angleToCoordinate(angle, value, index) {
        let x = -Math.cos(angle) * radialScale(value);
        let z = -Math.sin(angle) * radialScale(value);
        let y = zScale(index);
        return new THREE.Vector3(x, y, z);
    }

    data.forEach((d, i) => {
        let angle = (Math.PI / 2) + (2 * Math.PI * d.Month / 12);
        d.coord = angleToCoordinate(angle, d.Count, i);
        d.r = radialScale(d.Count);
    });

    let segments = data.map((d, i) => [d, (i + 1) < data.length ? data[i + 1] : null]).slice(0, data.length - 1);
    segments.forEach(d => {
        let color = d3.interpolateRdBu((scaleMax - (d[0].Count * .5 + d[1].Count * .5)) / scaleMax);
        const material = new THREE.LineBasicMaterial({
            color: color
        });
        const geometry = new THREE.BufferGeometry().setFromPoints([d[0].coord, d[1].coord]);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
    });
    renderer.render(scene, camera);
}
createVis();
