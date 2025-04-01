/**
 * URL base de la API para gestionar usuarios.
 */
const apiUrl = "http://localhost:3000/api/users";

/**
 * Obtiene y muestra la lista de usuarios en la tabla.
 */
async function getUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();

    let tableContent = "";
    users.forEach(user => {
        tableContent += `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.apellido}</td>
                <td>${user.telefono}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm m-1" onclick="openEditModal(${user.id})">Actualizar</button>
                    <button class="btn btn-danger btn-sm m-1" onclick="deleteUser(${user.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });

    document.getElementById("userTable").innerHTML = tableContent;
}

/**
 * Agrega un nuevo usuario a la base de datos.
 */
async function addUser() {
    const name = document.getElementById("name").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, apellido, telefono, email })
    });

    const data = await response.json();

    if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "Usuario agregado",
            text: data.message
        });
        getUsers(); // Recargar lista de usuarios
        document.getElementById("userForm").reset(); // Limpiar formulario
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: data.error || "No se pudo agregar el usuario."
        });
    }
}

/**
 * Abre el modal de edición y carga los datos del usuario.
 * @param {number} userId - ID del usuario a editar.
 */
async function openEditModal(userId) {
    try {
        const response = await fetch(`${apiUrl}/${userId}`);
        if (!response.ok) throw new Error("Error al obtener los datos del usuario");

        const user = await response.json();

        document.getElementById('editUserId').value = user.id;
        document.getElementById('editName').value = user.name;
        document.getElementById('editApellido').value = user.apellido;
        document.getElementById('editTelefono').value = user.telefono;
        document.getElementById('editEmail').value = user.email;

        let modal = new bootstrap.Modal(document.getElementById('editUserModal'));
        modal.show();
    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}

/**
 * Guarda los cambios en un usuario y actualiza la base de datos.
 */
async function saveUserChanges() {
    let userId = document.getElementById('editUserId').value;
    let name = document.getElementById('editName').value;
    let apellido = document.getElementById('editApellido').value;
    let telefono = document.getElementById('editTelefono').value;
    let email = document.getElementById('editEmail').value;

    const userData = { name, apellido, telefono, email };

    try {
        const response = await fetch(`${apiUrl}/${userId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "No se pudo actualizar el usuario.");

        Swal.fire({
            icon: "success",
            title: "Usuario actualizado",
            text: data.message
        });

        // Cerrar el modal después de la actualización
        let modalElement = document.getElementById('editUserModal');
        let modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();

        // Recargar lista de usuarios
        getUsers();

    } catch (error) {
        Swal.fire("Error", error.message, "error");
    }
}

/**
 * Elimina un usuario después de una confirmación.
 * @param {number} id - ID del usuario a eliminar.
 */
async function deleteUser(id) {
    const result = await Swal.fire({
        title: "¿Seguro que deseas eliminar este usuario?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        confirmButtonColor: "red",
        cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        const data = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Usuario eliminado",
                text: data.message
            });
            getUsers();
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: data.error || "No se pudo eliminar el usuario."
            });
        }
    }
}

/**
 * Carga la lista de usuarios al cargar la página.
 */
getUsers();
