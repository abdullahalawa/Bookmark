var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkListTable = document.getElementById("bookmarkListTable");

var addNewBookmarkButton = document.getElementById("addNewBookmark");
var updateBookmarkButton = document.getElementById("updateBookmark");

// Main URL List Repository
var urlList = [];

// saved index for updated product
var updatedProduct;

// Return all saved items in Local Storage When the App start working
if (localStorage.getItem("urlList") != null) {
  urlList = JSON.parse(localStorage.getItem("urlList"));
  displayBookmarks();
}

// Add New Bookmark
function addNewBookmark() {
  var newBookmark = {
    siteName: siteNameInput.value,
    siteUrl: siteUrlInput.value,
  };

  urlList.push(newBookmark);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayBookmarks();
  clearInputs();
}

// Clear inputs after submission
function clearInputs() {
  siteNameInput.value = null;
  siteUrlInput.value = null;
}

// Display Bookmarks in table
function displayBookmarks() {
  var bookmarkDisplay = "";

  for (var i = 0; i < urlList.length; i++) {
    bookmarkDisplay += `<tr class="text-center">
        <td scope="row" class="">${i + 1}</td>
        <td class="">${urlList[i].siteName}</td>
        <td class="">
        <a class="btn btn-success" href="${urlList[i].siteUrl}" target="_blank"
        ><i class="fa-solid fa-eye text-white pe-2"></i>Visit</a
      >
        </td>
        <td class="">
          <button onclick="moveDataToInputs(${i})" class="btn btn-info text-white">
            <i class="fa-regular fa-pen-to-square text-white pe-2"></i
            >Update
          </button>
        </td>

        <td class="">
        <button onclick="DeleteBookmark(${i})" class="btn btn-danger">
          <i class="fa-solid fa-trash-can text-white pe-2"></i
          >Delete
        </button>
      </td>
        </tr>`;
  }

  bookmarkListTable.innerHTML = bookmarkDisplay;
}

// Delete Bookmark
function DeleteBookmark(deletedIndex) {
  urlList.splice(deletedIndex, 1);
  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayBookmarks();
}

//Move data to inputs
function moveDataToInputs(dataIndex) {
  siteNameInput.value = urlList[dataIndex].siteName;
  siteUrlInput.value = urlList[dataIndex].siteUrl;

  addNewBookmarkButton.classList.replace("d-block", "d-none");
  updateBookmarkButton.classList.replace("d-none", "d-block");

  updatedProduct = dataIndex;
}

// Update Bookmark
function updateBookmark() {
  urlList[updatedProduct].siteName = siteNameInput.value;
  urlList[updatedProduct].siteUrl = siteUrlInput.value;

  localStorage.setItem("urlList", JSON.stringify(urlList));
  displayBookmarks();

  addNewBookmarkButton.classList.replace("d-none", "d-block");
  updateBookmarkButton.classList.replace("d-block", "d-none");
  clearInputs();

  console.log(urlList);
}
