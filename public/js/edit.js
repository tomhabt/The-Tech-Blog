async function editPostHandler(event) {
    event.preventDefault();
  
    const post_title = document.querySelector('#post-title-input-label').value.trim();
    const post_content = document.querySelector('#post-content-input-label').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        post_title,
        post_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    };
};
  
document.querySelector('.update-post-btn').addEventListener('click', editPostHandler);