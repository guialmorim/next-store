import Swal from 'sweetalert2';

export const ConfirmationAlert = (title: string, text: string) => {
	return Swal.fire({
		title: title,
		text: text,
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Sim!',
		cancelButtonText: 'Não!',
	}).then((result) => result.isConfirmed);
};

export const Alert = (
	title: string,
	text: string,
	icon: 'info' | 'success' | 'error' | 'warning'
) => {
	Swal.fire({
		icon: icon,
		title: title,
		text: text,
		// footer: '<a href>Why do I have this issue?</a>',
	});
};
