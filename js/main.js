var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var bookmarkListTable = document.getElementById("bookmarkListTable");

// Main URL List Repository
var urlList = [];

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
          <button class="btn btn-success">
            <i class="fa-solid fa-eye text-white pe-2"></i>Visit
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
