function ajaxfunction(command, sourceID, targetID, useJSON) {
  return function() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        if (useJSON == "yes") {
          document.getElementById(targetID).innerHTML = yearparse(
            this.responseText
          );
        } else {
          document.getElementById(targetID).innerHTML = this.responseText;
        }
      }
    };
    charstyped = encodeURIComponent(document.getElementById(sourceID).value);
    xmlhttp.open(
      "GET",
      "https://www.lampbusters.com/coperni/javascript2/grbooks_ajax.php?command=" +
        command +
        "&searchterm=" +
        charstyped,
      true
    );
    xmlhttp.send();
  };
}

const yearparse = jsonString => {
  var myArr = JSON.parse(jsonString);
  var jsonMsg = "<table><caption>Json List of Titles</caption><tbody>";
  myArr.map(item => {
    jsonMsg += `
      <tr>
        <td>${item.title}</td>
        <td>${item.year}</td>
        <td>${item.publisher}</td>
        <td>${item.isbn13}</td>
      </tr>
    `;
  });
  // for (var i = 0, len = myArr.length; i < len; i++) {
  //   jsonMsg += myArr[i].title + "," + myArr[i].year + "<br />";
  // }
  jsonMsg += "</tbody></table>";
  return jsonMsg;
};

window.onload = setupEvents;
function setupEvents() {
  document.getElementById("year").onkeyup = ajaxfunction(
    "byyear",
    "year",
    "outputyear",
    "no"
  );
  document.getElementById("title").onkeyup = ajaxfunction(
    "bytitle",
    "title",
    "titleoutput",
    "no"
  );
  document.getElementById("yearjson").onkeyup = ajaxfunction(
    "byyearjson",
    "yearjson",
    "yearout",
    "yes"
  );
  document.getElementById("byauthor").onkeyup = ajaxfunction(
    "byauthor",
    "byauthor",
    "byauthorout",
    "no"
  );
}
