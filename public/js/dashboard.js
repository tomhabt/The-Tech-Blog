// newPostButtonHandler
async function newPostButtonHandler() {
      document.location.replace('/dashboard/create');
  };

// CreateButtonHandler
async function CreateButtonHandler() {
  const post_title = document.querySelector('#ptitle').value;
  const post_content = document.querySelector('#pcontent').value;
  if (post_title && post_content) {
      const response = await fetch('/api/posts', {
          method: 'post',
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

document.querySelector('#new-post-btn').addEventListener('click', newPostButtonHandler);

document.querySelector('').addEventListener('click', CreateButtonHandler);



