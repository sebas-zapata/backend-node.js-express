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
                <button class="btn btn-primary btn-sm m-1" onclick="viewUser(${user.id})"><i class="fas fa-eye"></i></button>
                    <button class="btn btn-warning btn-sm m-1" onclick="openEditModal(${user.id})"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-danger btn-sm m-1" onclick="deleteUser(${user.id})"><i class="fas fa-trash-alt"></i></button>
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
    const name = document.getElementById("name").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const email = document.getElementById("email").value.trim();

    // Validaciones
    if (!name || !apellido || !telefono || !email) {
        return Swal.fire({
            icon: "warning",
            title: "Campos incompletos",
            text: "Por favor completa todos los campos antes de continuar."
        });
    }

    // Validación básica de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return Swal.fire({
            icon: "error",
            title: "Correo inválido",
            text: "Por favor ingresa un correo electrónico válido."
        });
    }

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

        document.getElementById('editUserModalLabel').innerHTML = `<i class="fas fa-user-edit"></i> Editar usuario: ${user.name} ${user.apellido}`;
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
* Muestra la información de un usuario en una alerta
* @param {number} id - ID del usuario a consultar.
*/
async function viewUser(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la información del usuario");

        const user = await response.json();

        Swal.fire({
            title: `Información del usuario ID ${user.id}`,
            html: `
                <strong>Nombre:</strong> ${user.name}<br>
                <strong>Apellido:</strong> ${user.apellido}<br>
                <strong>Teléfono:</strong> ${user.telefono}<br>
                <strong>Email:</strong> ${user.email}
            `,
            icon: "info"
        });
    } catch (error) {
        console.error("Error al obtener usuario:", error);
        Swal.fire("Error", error.message, "error");
    }
}

/**
 * Carga la lista de usuarios al cargar la página.
 */
getUsers();
