var data;
var dist;
var metric;
var results;

//helpers
var _magnitude = function(v){
	var d = 0
	for (var i = 0; i < v.length ; i++){
		d += Math.pow(v[i],2);
	}
	return Math.sqrt(d);
}

var _dot = function(a,b){
	var d = 0;
	for (var i = 0; i < a.length ; i++){
		d += a[i]*b[i]
	}
	return d;
}

var _find_centroid = function(c) {
	var centroid = [];
	for (var i = 0 ; i < data[0].length ; i++){
		var _c = 0;
		for (var j = 0 ; j < c.length ; j++){
			_c += data[c[j]][i];
		}
		centroid.push(_c/c.length);
	}
	return centroid;
}

//distance between 2 vectors - a and b must be vectors of the same length
var _euclidean = function(a,b){
	var d = 0;
	for (var i = 0; i < a.length ; i++){
		d += Math.pow(a[i]-b[i],2);
	}
	return d;
}

var _manhattan = function(a,b){
	var d = 0;
	for (var i = 0; i < a.length ; i++){
		d += Math.abs(a[i]-b[i]);
	}
	return d;
}

var _cosine = function(a,b){
	return 1 - _dot(a,b)/(_magnitude(a)*_magnitude(b));
}

var _braycurtis = function(a,b){
	var n = 0;
	var d = 0;
	for (var i = 0; i < a.length ; i++){
		n += Math.abs(a[i]-b[i]);
		d += Math.abs(a[i]+b[i]);
	}
	return n/d
}

var _canberra = function(a,b){
	var n = 0;
	var d = 0;
	for (var i = 0; i < a.length ; i++){
		n += Math.abs(a[i]-b[i]);
		d += Math.abs(a[i]);
		d += Math.abs(b[i]);
	}
	return n/d
}

var _chebychev = function(a,b){
	var max = 0;
	for (var i = 0; i < a.length ; i++){
		max = Math.max(max,Math.abs(a[i]-b[i]));
	}
	return max;
}

var _correlation = function(a,b){
	var meanA = math.mean(a);
	var meanB = math.mean(b);
	var newA = a.map(x => x - meanA);
	var newB = b.map(x => x - meanB);
	return _cosine(newA, newB);
}

// Distance metrics between two clusters clusters u and v: 
// single - shortest distance between any pt in u and any pt in v
// complete - longest ""
// average - average ""
// centroid - distance between centroids of each cluster
// not implemented yet: ward

var _single = function (u,v){
	var u = u.items;
	var v = v.items;
	var min = Number.MAX_SAFE_INTEGER
	u.forEach(function(i){
		v.forEach(function(j){
			min = Math.min(dist(data[i],data[j]),min);
		});
	});
	return min;
}

var _complete = function (u,v){
	var u = u.items;
	var v = v.items;
	var max = 0;
	u.forEach(function(i){
		v.forEach(function(j){
			max = Math.max(dist(data[i],data[j]),max);
		});
	});
	return max;
}

var _average = function (u,v){
	var u = u.items;
	var v = v.items;
	var s = 0;
	var l = 0;
	u.forEach(function(i){
		v.forEach(function(j){
			s += dist(data[i],data[j]);
			l += 1;
		});
	});
	return s / l;
}

var _centroid = function(u,v){
	if (!u.centroid){
		u.centroid = _find_centroid(u.items);
	}
	if (!v.centroid){
		v.centroid = _find_centroid(v.items);
	}
	return dist(u.centroid, v.centroid)
}

// implementation of ward's algorithm; needs to be tested and revised
var _ward = function(u, v) {
	
	if (u.items.length == 1) // u.metric is undefined
		return 1; // is this correct

	var s = u.children[0];
	var t = u.children[1];

	var sSize = s.items.length;
	var tSize = t.items.length;
	var vSize = v.items.length;
	var T = sSize + tSize + vSize;

	var dist_vs = (vSize + sSize) * Math.pow(_ward(v, s), 2) / T; // better way to do w/o recursion?
	var dist_vt = (vSize + tSize) * Math.pow(_ward(v, t), 2) / T;
	var dist_st = vSize * Math.pow(u.metric, 2) / T;

	return Math.sqrt(dist_vs + dist_vt - dist_st);
}

// a [cluster] will be represented as a JSON object, tree structured, as defined below
// {
// 	items : [int list] representing indices in the data matrix which each represent 1 sample
// 	children : [cluster list] (of which this cluster is formed from); empty if this cluster is leaf
// }

//initializes a set of clusters from the data - each sample is in its own cluster
function init(data){
	var init_clusters = [];
	for (var i = 0; i< data.length ; i++){
		init_clusters.push({"items":[i], "children":[], "metric":undefined});
	}
	return init_clusters;
}

//takes one set of clusters and merges the two closest clusters based on some metric
//metric must me one of the four defined above
function step(clusters){
	console.log("step");
	console.log(clusters.length)
	var n_clusters = clusters.length;
	//find minimum
	var min = Number.MAX_SAFE_INTEGER;
	var a,b;
	for (var i = 0 ; i < n_clusters ; i++){
		for (var j = i ; j < n_clusters ; j++){
			if (i!=j){
				var closeness = metric(clusters[i], clusters[j]);
				if (closeness < min){
					a = i;
					b = j;
					min = closeness;
				}				
			}
		}	
	}
	var new_clusters = clusters.filter(function(x,i){ return i!=a && i!=b;});
	//merge two closest clusters A and B
	var clusterA = clusters[a];
	var clusterB = clusters[b];
	var merged = {"items":(clusterA.items).concat(clusterB.items), "children":[clusterA,clusterB], "metric":min};
	new_clusters.push(merged);
	return new_clusters;
}

//data is the data, n is the number of clusters u want to end up with
function cluster(data,n){
	var clusters = init(data);
	var n_clusters = data.length;
	while (n_clusters > n){
		clusters = step(clusters);
		n_clusters -= 1;
	}
	if(clusters.length != n){console.error("something went wrong");}
	return clusters;
}

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

//performs agglomerative clustering on 2d array of data until you end up with [n] clusters
//then it automatically downloads the results as "results.json"
//inputs: n - int
function ready(n){
	results = cluster(data,n);
	console.log("done");
	download(JSON.stringify(results), 'results.json', 'text/plain');
}
