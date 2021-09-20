// CreateButtonHandler
async function CreateButtonHandler(event) {
    event.preventDefault();
    
    const post_title = document.querySelector('#post-title-input-label').value;
    const post_content = document.querySelector('#post-content-input-label').value;
    if (post_title && post_content) {
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({
              post_title,
              post_content
            }),
            headers: { 'Content-Type': 'application/json' }
          });
      
          if (response.ok) {
            document.location.replace('/dashboard');
          } else {
            alert(response.statusText);
          }; 
    };
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', CreateButtonHandler);
