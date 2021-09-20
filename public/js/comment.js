async function commentFormHandler(event) {
    event.preventDefault();
  
    const comment_text = document.querySelector('#user-comment-input').value;
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
            
            const commnetLabelEl = document.querySelector('#comment-label');
            commnetLabelEl.style.visibility = 'hidden';

            const commnetInputEl = document.querySelector('#user-comment-input');
            commnetInputEl.style.visibility = 'hidden';

            const submitBtnEl = document.querySelector('#submit-btn');
            submitBtnEl.style.visibility = 'hidden';

            const showNewCommnetEl = document.querySelector('#show-new-comment');
            showNewCommnetEl.style = 'show';
            showNewCommnetEl.innerHTML = comment_text;

            const showNewCommnetUserNameEl = document.querySelector('#show-new-comment-username');
            showNewCommnetUserNameEl.style = 'show';

            const dateEl = document.querySelector('#date');
            dateEl.innerHTML = Date();

            // document.location.reload();
          } else {
            alert(response.statusText);
          };
        };
    };
    

document.querySelector('#submit-btn').addEventListener('click', commentFormHandler);