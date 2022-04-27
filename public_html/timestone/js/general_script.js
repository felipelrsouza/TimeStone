function deleteProject(arg) {
    id = arg.getAttribute("data-id");
    axios
        .delete(apiURL + "projects/" + id)
        .then((response) => window.location.reload())
        .catch((error) => alert(error));
}

function deleteTag(arg) {
    id = arg.getAttribute("data-id");
    axios
        .delete(apiURL + "tags/" + id)
        .then((response) => window.location.reload())
        .catch((error) => alert(error));
}
