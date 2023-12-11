function validateForm() {
    var name = document.getElementById("name").value;
    var umur = document.getElementById("umur").value;
    var kelas = document.getElementById("kelas").value;
    var npm = document.getElementById("npm").value;
    var alamat = document.getElementById("alamat").value;
    var email = document.getElementById("email").value;

    if (name == "") {
        alert("Name is Required");
        return false;
    }

    if (umur == "") {
        alert("Age is Required");
        return false;
    } else if (umur < 1) {
        alert("Umur harus tidak boleh angka 0 ataupun dibawah 0");
        return false;
    }

    if (kelas == "") {
        alert("Class is Required");
        return false;
    }

    if (npm == "") {
        alert("NPM is Required");
        return false;
    }

    if (alamat == "") {
        alert("Address is Required");
        return false;
    }

    if (email == "") {
        alert("Email is Required");
        return false;
    } else if (!email.includes("@")) {
        alert("Invalid email address");
        return false;
    }

    return true;
}
// menampilkan data yang tersimpan dalam variabel peopleList ke dalam tabel
function showData() {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    var html = "";

    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.umur + "</td>";
        html += "<td>" + element.kelas + "</td>";
        html += "<td>" + element.npm + "</td>";
        html += "<td>" + element.alamat + "</td>";
        html += "<td>" + element.email + "</td>";
        html += '<td><button onclick="deleteData(' + index + ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' + index + ')" class="btn btn-warning">Update</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

// Memperbaiki event "onload"
window.onload = function () {
    showData();
}

// function untuk add Data
function AddData() {
    if (validateForm() == true) {
        var name = document.getElementById("name").value;
        var umur = document.getElementById("umur").value;
        var kelas = document.getElementById("kelas").value;
        var npm = document.getElementById("npm").value;
        var alamat = document.getElementById("alamat").value;
        var email = document.getElementById("email").value;

        var peopleList;
        if (localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            umur: umur,
            kelas: kelas,
            npm: npm,
            alamat: alamat,
            email: email,
        });

        localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();
        document.getElementById("name").value = "";
        document.getElementById("umur").value = "";
        document.getElementById("kelas").value = "";
        document.getElementById("npm").value = "";
        document.getElementById("alamat").value = "";
        document.getElementById("email").value = "";
    }
}

// function untuk delete data
function deleteData(index) {
    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.splice(index, 1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

// function untuk update data di local storage
function updateData(index) {

    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("umur").value = peopleList[index].umur;
    document.getElementById("kelas").value = peopleList[index].kelas;
    document.getElementById("npm").value = peopleList[index].npm;
    document.getElementById("alamat").value = peopleList[index].alamat;
    document.getElementById("email").value = peopleList[index].email;

    // untuk memperbarui data yang tersimpan dalam variabel peopleList dan localStorage.
    document.getElementById("Update").onclick = function () {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].umur = document.getElementById("umur").value;
            peopleList[index].kelas = document.getElementById("kelas").value;
            peopleList[index].npm = document.getElementById("npm").value;
            peopleList[index].alamat = document.getElementById("alamat").value;
            peopleList[index].email = document.getElementById("email").value;

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("umur").value = "";
            document.getElementById("kelas").value = "";
            document.getElementById("npm").value = "";
            document.getElementById("alamat").value = "";
            document.getElementById("email").value = "";
            // menampilkan tombol submit dan menghilangkan tombol update
            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}
