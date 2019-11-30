const hideOutput = shown => {
  document.getElementById("outputyear").style.display = "none";
  document.getElementById("titleoutput").style.display = "none";
  document.getElementById("yearout").style.display = "none";
  document.getElementById("byauthorout").style.display = "none";
  if (shown) {
    document.getElementById(shown).style.display = "block";
  }
};

const ajaxfunction = (command, sourceID, targetID, useJSON) => {
  return () => {
    hideOutput(targetID);
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
};

const yearparse = jsonString => {
  var myArr = JSON.parse(jsonString);
  if (myArr.length > 0) {
    var jsonMsg =
      "<table class='output-table'><caption>Json List of Titles</caption><tbody>";
    jsonMsg += `
  <tr>
    <th>Title</th>
    <th>Year</th>
    <th>Publisher</th>
    <th>ISBN</th>
  </tr>
`;
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
    jsonMsg += "</tbody></table>";
    return jsonMsg;
  } else {
    return "No results found";
  }
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
  hideOutput();
}
