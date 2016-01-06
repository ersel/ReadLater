'use strict';

function addBookmark(parentFolder){
	// Do NOT forget that the method is ASYNCHRONOUS
	chrome.tabs.query({
			active: true,               // Select active tabs
			lastFocusedWindow: true     // In the current window
	}, function(array_of_Tabs) {
		// Since there can only be one active tab in one active window,
		//  the array has only one element
		var tab = array_of_Tabs[0];
		// ... do something with url variable
		chrome.bookmarks.search(tab.url,
			function(BookmarksArray){
				var bookmark = {title: tab.title, url: tab.url, parentId: parentFolder.id};
				if(BookmarksArray.length > 0){
					if(BookmarksArray[0].parentId !== parentFolder.id){
						chrome.bookmarks.create(bookmark, window.close);
					}
				} else {
					chrome.bookmarks.create(bookmark, window.close);
				}
			}
		);
	});
}

// MAIN FUNCTION
chrome.bookmarks.search('ReadNowBookmarks',
	function(BookmarksArray){
		if(BookmarksArray.length > 0){
			addBookmark(BookmarksArray[0]);
		} else {
			//Bookmark folder does not exist
			var bookmark = {title: 'ReadNowBookmarks'};
			chrome.bookmarks.create(bookmark, function(createdFolder){
				addBookmark(createdFolder, window.close);
			});
		}
	}
);
