function summaryContentTemplate(userName, greeting) {
    return `
        <div>
            <section class="order_todo_done_box margin_left">
                <div class="style_todo_done_box style_boxes style_done_box_hover" onclick="goToBoardPage()">
                    <img class="img_summary_edit_check_icon" src="./assets/img/summary_edit_icon.svg" alt="Edit Icon">
                    <div class="order_number_text">
                        <p class="summary_number">1</p>
                        <p class="style_text">To Do</p>
                    </div>
                </div>
                <div class="style_todo_done_box style_boxes style_todo_box_hover" onclick="goToBoardPage()">
                    <img class="img_summary_edit_check_icon" src="./assets/img/summary_check_icon.svg" alt="Check Icon">
                    <div class="order_number_text">
                        <p class="summary_number">2</p>
                        <p class="style_text">Done</p>
                    </div>
                </div>
            </section>
            
            <section class="box_prio_tickets margin_left style_boxes" onclick="goToBoardPage()">
                 <div class="counter_prio_tickets">
                    <img src="./assets/img/summary_prio_icon.svg" alt="Priority Icon">
                    <div class="order_number_text">
                        <p class="summary_number">3</p>
                        <p class="style_prio_area">Urgent</p>
                    </div>
                </div>
                <div class="divider_prio_box"></div>
                <div class="deadline_information">
                    <p class="date_of_deadline">October 16, 2022</p>
                    <p class="style_prio_area">Upcoming Deadline</p>
                </div>
            </section>

            <section class="order_ticket_box_below margin_left">
                 <div class="order_number_text style_boxes boxes_last_row" onclick="goToBoardPage()">
                        <p class="summary_number">4</p>
                        <p class="style_text">Tasks in <br> Board</p>
                    </div>
                    <div class="order_number_text style_boxes boxes_last_row" onclick="goToBoardPage()">
                        <p class="summary_number">5</p>
                        <p class="style_text">Tasks in <br> Progress</p>
                    </div>
                    <div class="order_number_text style_boxes boxes_last_row" onclick="goToBoardPage()">
                        <p class="summary_number">6</p>
                        <p class="style_text">Awaiting <br> Feedback</p>
                    </div>
            </section>
        </div>

        <div class="order_greeting_username">
            <p class="style_greeting_text">${greeting}</p>
            <h1 class="style_username">${userName}</h1>
        </div>
    `;
}


