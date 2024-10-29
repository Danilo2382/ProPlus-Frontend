import Swal from "sweetalert2";

export function showInfo(iconType: 'success' | 'error' | 'warning',message: string) {
  Swal.fire({
      icon: iconType,
      text: message,
      showConfirmButton: false,
      timer: 1500
    },
  ).then();
}
