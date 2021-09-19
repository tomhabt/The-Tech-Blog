async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('.comment-input').value;
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1];
    
    // check if user provided a comment in the provided area before raching to db
        if (comment_text) {
          const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
              comment_text,
              post_id,
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
          if (response.ok) {
            console.log(response)
            document.location.reload();
          } else {
            alert(response.statusText);
          };
        };
    };
    

document.querySelector('#submit-btn').addEventListener('click', commentFormHandler);