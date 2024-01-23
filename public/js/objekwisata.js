import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, set, ref, push, child, onValue } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCt5I-Ww0rw56q4sI_NxXoNHkFklDYm0UQ",
  authDomain: "explorebojonegoro-7a669.firebaseapp.com",
  databaseURL: "https://explorebojonegoro-7a669-default-rtdb.firebaseio.com",
  projectId: "explorebojonegoro-7a669",
  storageBucket: "explorebojonegoro-7a669.appspot.com",
  messagingSenderId: "968195432323",
  appId: "1:968195432323:web:04c5641bb2aacff48860b6",
  measurementId: "G-9TGN2QB0F7"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class WisataItem {
  constructor({ no, wisata, alamat, latitude, longitude, imageUrl, kategori, deskripsi, tipsSaran, lainLain }) {
    this.no = no;
    this.wisata = wisata;
    this.alamat = alamat;
    this.latitude = latitude;
    this.longitude = longitude;
    this.imageUrl = imageUrl;
    this.kategori = kategori;
    this.deskripsi = deskripsi;
    this.tipsSaran = tipsSaran;
    this.lainLain = lainLain;
  }
}

class AppController {
  constructor() {
    this.selectedKey = null;
  }

  displayData() {
    const dataTableBody = document.getElementById('data-table-body');
    onValue(ref(database, 'objekwisata/'), (snapshot) => {
      const data = snapshot.val();
      dataTableBody.innerHTML = '';
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          const item = new WisataItem(data[key]);
          const row = this.renderRow(item, key);
          dataTableBody.appendChild(row);
        }
      }
    });
  }

  renderRow(item, key) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.no}</td>
      <td>${item.wisata}</td>
      <td>${item.alamat}</td>
      <td>${item.latitude}</td>
      <td>${item.longitude}</td>
      <td>${item.imageUrl}</td>
      <td>${item.kategori}</td>
      <td>${item.deskripsi}</td>
      <td>${item.tipsSaran}</td>
      <td>${item.lainLain}</td>
      <td class="text-center">
        <button class="btn btn-warning btn-sm" data-action="edit" data-key="${key}")">Edit</button>
        <button class="btn btn-danger btn-sm" data-action="delete" data-key="${key}"">Delete</button>
      </td>
    `;
    return row;
  }


  editRow(key) {
    this.selectedKey = key;

    // Populate the edit form with the selected item's data
    const selectedItemRef = ref(database, `objekwisata/${key}`);
    onValue(selectedItemRef, (snapshot) => {
      const selectedItem = snapshot.val();
      document.getElementById('editNo').value = selectedItem.no;
      document.getElementById('editWisata').value = selectedItem.wisata;
      document.getElementById('editAlamat').value = selectedItem.alamat;
      document.getElementById('editLatitude').value = selectedItem.latitude;
      document.getElementById('editLongitude').value = selectedItem.longitude;
      document.getElementById('editImageUrl').value = selectedItem.imageUrl;
      document.getElementById('editKategori').value = selectedItem.kategori;
      document.getElementById('editDeskripsi').value = selectedItem.deskripsi;
      document.getElementById('editTipsSaran').value = selectedItem.tipsSaran;
      document.getElementById('editLainLain').value = selectedItem.lainLain;

      // Show the edit modal
      $('#editModal').modal('show');
    });
  }


  deleteRow(key) {
    // Confirm deletion
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (!confirmation) {
      return;
    }

    // Remove the corresponding data from the database
    const itemRef = ref(database, `objekwisata/${key}`);
    set(itemRef, null)
      .then(() => {
        alert('Item deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item: ', error);
        alert('Error deleting item');
      });
  }


  addRow() {
    const lastItemNo = document.getElementById("data-table-body").lastElementChild ?
      parseInt(document.getElementById("data-table-body").lastElementChild.querySelector("td:first-child").innerText) : 0;
    document.getElementById("no").value = lastItemNo + 1;
  }

  submitAddForm() {
    const formData = {
      no: document.getElementById('no').value,
      wisata: document.getElementById('wisata').value,
      alamat: document.getElementById('alamat').value,
      latitude: document.getElementById('latitude').value,
      longitude: document.getElementById('longitude').value,
      imageUrl: document.getElementById('imageUrl').value,
      kategori: document.getElementById('kategori').value,
      deskripsi: document.getElementById('deskripsi').value,
      tipsSaran: document.getElementById('tipsSaran').value,
      lainLain: document.getElementById('lainLain').value,
    };
    const newPostRef = push(ref(database, 'objekwisata/'));
    set(newPostRef, formData).then(() => {
      $('#addModal').modal('hide');
      alert('Add data Success');
    })
      .catch(error => {
        console.error('Error add document: ', error);
        alert('Error add document');
      });


  }

  submitEditForm() {
    const formData = this.getEditFormData();

    set(ref(database, `objekwisata/${this.selectedKey}`), formData)
      .then(() => {
        $('#editModal').modal('hide');
        alert('Updated successfully');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
        alert('Error updating document');
      });
  }

  getEditFormData() {
    return {
      no: document.getElementById('editNo').value,
      wisata: document.getElementById('editWisata').value,
      alamat: document.getElementById('editAlamat').value,
      latitude: document.getElementById('editLatitude').value,
      longitude: document.getElementById('editLongitude').value,
      imageUrl: document.getElementById('editImageUrl').value,
      kategori: document.getElementById('editKategori').value,
      deskripsi: document.getElementById('editDeskripsi').value,
      tipsSaran: document.getElementById('editTipsSaran').value,
      lainLain: document.getElementById('editLainLain').value,
    };
  }
}

const appController = new AppController();

document.getElementById('data-table-body').addEventListener('click', function (event) {
  const target = event.target;
  const action = target.dataset.action;
  const key = target.dataset.key;

  if (action === 'edit') {
    appController.editRow(key);
  } else if (action === 'delete') {
    appController.deleteRow(key);
  }
});

document.getElementById('addForm').addEventListener('submit', function (event) {
  event.preventDefault();
  appController.addRow();
});

document.getElementById('addForm').addEventListener('submit', function (event) {
  event.preventDefault();
  appController.submitAddForm();
});

document.getElementById('editForm').addEventListener('submit', function (event) {
  event.preventDefault();
  appController.submitEditForm();
});

appController.displayData();
