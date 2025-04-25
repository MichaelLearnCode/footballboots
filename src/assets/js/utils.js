export function alert(message, status = "success") {
  const toast = document.createElement('div');
  toast.className = "px-4 py-3 bg-white shadow-sm rounded-2 toast";
  toast.textContent = message;
  switch (status) {
    case "success":
      toast.classList.add('bg-success', 'text-white');
      break;
    case "error":
      toast.classList.add('bg-danger', 'text-white');
      break;
    case "warning":
      toast.classList.add('bg-warning', 'text-dark');
      break;
    default:
      toast.classList.add('bg-info', 'text-white');
  }
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

export function debounce(cb, delay = 1000) {
  let timeout;
  return (args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
          cb(args);
      }, delay);
  };
}