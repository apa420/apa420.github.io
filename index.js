"use strict";

function Get(uri){
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET",uri,false);
  Httpreq.send(null);
  return Httpreq.responseText;
}

function checkObjectKey(obj, key) {
  if (obj.hasOwnProperty(key)) {
    return true;
  }
  console.log("Object didn't have property %s", key);
  return false;
}

function main() {
  var jsonObj = JSON.parse(Get("https://gist.githubusercontent.com/apa420/5bb8cebdda4c7331d5384567f93e3267/raw/schedule.json"));
  console.log(jsonObj);

  if (!checkObjectKey(jsonObj, "schedule")) return;

  var body = document.getElementsByClassName("schedule")[0];
  console.log(jsonObj.schedule);
  for (let i = 0; i < jsonObj.schedule.length;i++) {
    let a = jsonObj.schedule[i];

    if (!checkObjectKey(a, "title")) return;
    console.log(a.title);

    if (!checkObjectKey(a, "twitch")) return;
    console.log(a.twitch);

    if (!checkObjectKey(a, "project")) return;
    console.log(a.project);

    if (!checkObjectKey(a, "time")) return;
    console.log(a.time);

    var div = document.createElement("div");
    div.className = "scheduleItem";
    
    var ul = document.createElement("ul");
    var title = document.createElement("li");
    var twitch = document.createElement("li");
    var project = document.createElement("li");
    var time = document.createElement("li");

    title.append("Title: ");
    title.append(document.createTextNode(a.title));

    twitch.append("Twitch: ");
    var twitchLink = document.createElement("a");
    twitchLink.href = a.twitch;
    twitchLink.text = a.twitch;
    twitch.append(twitchLink);

    project.append("Project: ");
    var projectLink = document.createElement("a");
    projectLink.href = a.project;
    projectLink.text = a.project;
    project.append(projectLink);

    time.append("When: ");
    var date = new Date(a.time);
    time.append(date);

    ul.appendChild(title);
    ul.appendChild(twitch);
    ul.appendChild(project);
    ul.appendChild(time);

    div.appendChild(ul);

    body.appendChild(div);
  }
}

main();
