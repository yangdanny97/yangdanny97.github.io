import * as THREE from 'three';
import { ArcballControls } from 'three/addons/controls/ArcballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 2.5;
camera.position.y = 3;
scene.rotateZ(0.25);
scene.rotateY(-0.75);
const axesHelper = new THREE.AxesHelper(3);
scene.add( axesHelper );

const controls = new ArcballControls(camera, renderer.domElement, scene);
controls.setGizmosVisible(false);
controls.addEventListener('change', function () {
    renderer.render(scene, camera);
});

function addTriangle(p1, p2, p3, color) {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(p1.concat(p2, p3));
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const material = new THREE.LineBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function createVis() {
    let data = await d3.csv("./rats.csv")
    let temperatureData = await d3.csv("./temperature.csv");
    let temperatures = {};
    temperatureData.forEach(d => {
        let year = parseInt(d.Year);
        temperatures[year] = {};
        months.forEach(m => {
            temperatures[year][m] = parseFloat(d[m]);
        });
    });
    data.forEach(d => {
        d.Month = parseInt(d.Month);
        d.Year = parseInt(d.Year);
        d.Count = parseInt(d.Count);
        d.Temperature = temperatures[d.Year][months[d.Month - 1]];
    });
    data.sort((a, b) => a.Year - b.Year || a.Month - b.Month);

    let maxCount = d3.max(data, d => d.Count);
    let scaleMax = 0;
    while (scaleMax < maxCount) {
        scaleMax += 500;
    }
    scaleMax -= 500;

    let tempScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.Temperature))
        .range([1, 0]);
    let radialScale = d3.scaleLinear()
        .domain([0, scaleMax])
        .range([0, 1]);
    let zScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 2]);

    function angleToCoordinate(angle, value, index) {
        let x = -Math.cos(angle) * radialScale(value);
        let z = -Math.sin(angle) * radialScale(value);
        let y = zScale(index);
        return [x, y, z];
    }

    data.forEach((d, i) => {
        let angle = (Math.PI / 2) + (2 * Math.PI * d.Month / 12);
        d.coord = angleToCoordinate(angle, d.Count, i);
        d.r = radialScale(d.Count);
    });

    const lookup = {};
    data.forEach(d => {
        if (lookup[d.Year] == null) {
            lookup[d.Year] = {};
        }
        lookup[d.Year][d.Month] = d;
    });

    for (var y = 2011; y < 2024; y++) {
        for (var m = 1; m <= 12; m++) {
            const p1 = lookup[y][m];
            const p2 = lookup[(m - 1 < 1) ? y - 1 : y][(m - 1 < 1) ? 12 : m - 1];
            const p3 = lookup[y - 1][m];
            if (p1 == null) continue;
            if (p2 == null) continue;
            if (p3 == null) continue;
            let color = d3.interpolateRdBu(tempScale((p1.Temperature + p2.Temperature + p3.Temperature) / 3));
            addTriangle(p1.coord, p2.coord, p3.coord, color);
        }
    }
    for (var y = 2010; y < 2023; y++) {
        for (var m = 1; m <= 12; m++) {
            const p1 = lookup[y][m];
            const p2 = lookup[(m + 1 > 12) ? y + 1 : y][(m + 1 > 12) ? 1 : m + 1];
            const p3 = lookup[y + 1][m];
            if (p1 == null) continue;
            if (p2 == null) continue;
            if (p3 == null) continue;
            let color = d3.interpolateRdBu(tempScale((p1.Temperature + p2.Temperature + p3.Temperature) / 3));
            addTriangle(p1.coord, p2.coord, p3.coord, color);
        }
    }
    renderer.render(scene, camera);
}
createVis();
