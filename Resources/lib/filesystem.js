

// Private properties
var Me = this;

var BASE_DIR = (function() {
	if (Ti.Filesystem.isExternalStoragePresent()) {
		return Ti.Filesystem.externalStorageDirectory;
	} else {
		return Ti.Filesystem.applicationDataDirectory;
	}
})();
var workingDirectory = Ti.Filesystem.getFile(BASE_DIR);

// Public
exports.pwd = function() {
	return workingDirectory;
};
exports.cd = function(name) {
	var d = Ti.Filesystem.getFile(BASE_DIR, name);
	if (!d.exists()) {
		d.createDirectory();
	}
	workingDirectory = d;
	return Me;
};
exports.writeFile = function(fileName, content) {
	var file = Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
	if (file.exists()) {
		file.deleteFile();
	};
	file.write(content);
	return Me;
};
exports.readTextFile = function(fileName) {
	var file = Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
	if (file.exists()) {
		var content = file.read();
		return content.text;
	};
	return null;
}
exports.deleteFile = function(fileName) {
	var file = Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
	if (file.exists()) {
		file.deleteFile();
	}
	return Me;
};
exports.open = function(fileName) {
	return Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
}
exports.mv = function(fileName, newName) {
	var file = Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
	file.rename(newName);
	return Me;
}
exports.exists = function(fileName) {
	var file = Ti.Filesystem.getFile(workingDirectory.nativePath, fileName);
	return file.exists(); 
};
exports.ls = function(folderName) {
	exports.cd(folderName);
	return workingDirectory.getDirectoryListing();
};



