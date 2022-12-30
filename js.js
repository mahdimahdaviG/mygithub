userNameText = document.getElementById("user-name");
userBlogLink = document.getElementById("user-blog-url");
userLocationText = document.getElementById("user-location");
userBioText = document.getElementById("user-bio");
userProfilePhoto = document.getElementById("profile-photo");
submitButton = document.getElementById("submit-button");
usernameTextbox = document.getElementById("username-input");
idText = document.getElementById("id-text");

// 
async function GetProfileInfo(username){
    // New request...
    if (window.localStorage.getItem(username) == undefined){
        let url = "https://api.github.com/users/" + username;
        let info = await fetch(url);

        // Successfull request. setting crawled data and saving them to storage
        if (info.status == 200){
            let json = await info.json();
            let name = json.name;
            let blog = json.blog;
            let location = json.location;
            let bio = json.bio;
            let avatar_url = json.avatar_url;
            fillProfileInfo(name, blog, location, bio, avatar_url);
            saveDataToStorage(username, name, blog, location, bio, avatar_url);
        }
        else{
            // invalid request. handling errors.
            idText.innerHTML = info.status + " " + info.statusText;
            setName("");
            setBio("");
            setBlog("");
            setLocation("");
            setProfilePhoto("");
            setTimeout(function(){ idText.innerHTML = ""}, 3000);
        }
    }
    else{
        // request has sent before. Loading from storage
        loadDataFromStorage(username);    
    }
}

// filling blocks with crawled data
function fillProfileInfo(name, blog, location, bio, avatar_url)
{
    userNameText.innerHTML = name;
    
    setBio(bio)
    setBlog(blog)
    setLocation(location)
    setProfilePhoto(avatar_url)
}

// setting name with error handling
function setName(name)
{
    if (name == null || name == "" || name == "null")
    {
        userNameText.innerHTML = "No Name";
    }
    else
    {
        userNameText.innerHTML = name;
    }
}

// setting bio with error handling
function setBio(bio)
{
    if (bio == null || bio == "" || bio == "null")
    {
        userBioText.innerHTML = "No bio";
    }
    else
    {
        userBioText.innerHTML = bio;
    }
}

// setting blog url with error handling

function setBlog(blog)
{
    if (blog == null || blog == "" || blog == "null")
    {
        userBlogLink.innerHTML = "No Blog";
        userBlogLink.href = "#";
    }
    else
    {
        userBlogLink.href = blog;
        userBlogLink.innerHTML = blog;
    }
}

// setting location with error handling

function setLocation(location)
{
    if (location == null || location == "" || location == "null")
    {
        userLocationText.innerHTML = "Undefined Location..."
    }
    else
    {
        userLocationText.innerHTML = location
    }
}
// setting profile url 
function setProfilePhoto(url)
{
    
    userProfilePhoto.src = url

}

// saving new data to storage
function saveDataToStorage(username, name, blog, location, bio, avatar_url){
    let data = name + "$$$" + blog + "$$$" + location + "$$$" + bio + "$$$" + avatar_url
    window.localStorage.setItem(username, data)
}

//loading stored data from storage and avoid making request
function loadDataFromStorage(username)
{
    data = window.localStorage.getItem(username).split("$$$");
    let name = data[0];
    let blog = data[1];
    let location = data[2];
    let bio = data[3];
    let avatar_url = data[4];
    fillProfileInfo(name, blog, location, bio, avatar_url);
    console.log("Reading From Storage")
}

submitButton.addEventListener('click', function(){ 
    let username = usernameTextbox.value.toLowerCase();
    GetProfileInfo(username); 
    console.log(window.localStorage);
})
window.localStorage.clear();




