var rgb = { r: 0, g: 0, b: 0 };


var loadPreview = function () {
    var preview = document.querySelector('img');
    var imgFile = document.querySelector('input[type=file]').files[0];
    var fileReader = new FileReader();
    var imgFileData;
    var imgLoader = function () {
        preview.src = fileReader.result;
    };
    fileReader.onloadend = imgLoader;
    if (imgFile) {
        imgFileData = fileReader.readAsDataURL(imgFile);
    } else {
        preview.src = "";
    }
};

function onError(error) {
    console.error(error);
    alert(error);
};

function fetchTilesAsync(imageTile, onData, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://localhost:3000/color/' + imageTile, true);
    xhr.onload = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                onData(xhr.responseText);
            } else {
                onError(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        oneError(xhr.statusText);
    };
    xhr.send(null);
}

var drawRow = function (imageToDraw) {
    for (var i = 0; i < imageToDraw.length; ++i) {
        var svg = document.createElement('src');
        svg.innerHTML = imageToDraw[i];
        document.getElementsByTagName('section')[0].appendChild(svg);
    }
    var br = document.createElement('br');
    document.getElementsByTagName('section')[0].appendChild(br);
};

function drawAllRow(row) {
    var resultRow = [], results = 0;
    for (var i = 0; i < row.length; i++) {
        resultRow[i] = null;
        (function (i) {
            fetchTilesAsync(row[i], function (data) {
                resultRow[i] = data;
                if (++results === row.length)
                    drawRow(resultRow);
            }, onError);
        })(i);
    }
};

var calculateAverage = function (imgData) {
    var count = 0;
    var i = -4;
    while ((i += 4) < imgData.length) {
        count++;
        rgb.r += imgData[i];
        rgb.g += imgData[i + 1];
        rgb.b += imgData[i + 2];
    }
    rgb.r = Math.floor(rgb.r / count);
    rgb.g = Math.floor(rgb.g / count);
    rgb.b = Math.floor(rgb.b / count);
    var hex = (rgb.r / 256 + 1 / 512).toString(16).substring(2, 4).toUpperCase() +
        (rgb.g / 256 + 1 / 512).toString(16).substring(2, 4).toUpperCase() +
        (rgb.b / 256 + 1 / 512).toString(16).substring(2, 4).toUpperCase();
    return hex;

};

var cutImageUp = function () {
    var img = document.querySelector("img");
    if (img.src) {
        var imgCols = Math.floor(img.width / TILE_WIDTH);
        var imgRows = Math.floor(img.height / TILE_HEIGHT);
        var imgTilesCols = [];
        var imgTilesRows = [];
        for (var x = 0; x < imgRows; ++x) {
            for (var y = 0; y < imgCols; ++y) {
                var canvas = document.createElement('canvas');
                canvas.width = TILE_WIDTH;
                canvas.height = TILE_HEIGHT;
                var context = canvas.getContext('2d');
                context.drawImage(img, y * TILE_WIDTH, x * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT, 0, 0, canvas.width, canvas.height);
                imgTilesCols.push(calculateAverage(context.getImageData(0, 0, TILE_WIDTH, TILE_HEIGHT).data));
            }
            drawAllRow(imgTilesCols);
            imgTilesCols = [];
        }
    }

};
