const url = "http://127.0.0.1:8000/api/";

function deleteProject(arg) {
    id = arg.getAttribute("data-id");
    axios
        .delete(url + "projects/" + id)
        .then((response) => window.location.reload())
        .catch((error) => alert(error));
}

function deleteTag(arg) {
    id = arg.getAttribute("data-id");
    axios
        .delete(url + "tags/" + id)
        .then((response) => window.location.reload())
        .catch((error) => alert(error));
}
