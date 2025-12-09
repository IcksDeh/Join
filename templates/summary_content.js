function summaryContentTemplate(){
    return `
        <div>
            <section class="order_todo_done_box margin_left">
                <div class="style_todo_done_box style_boxes">
                    <img class="img_summary_edit_check_icon" src="./assets/img/summary_edit_icon.svg" alt="edit">
                    <div class="order_number_text">
                        <p class="summary_number">1</p>
                        <p>To-do</p>
                    </div>
                </div>
                <div class="style_todo_done_box style_boxes">
                    <img class="img_summary_edit_check_icon" src="./assets/img/summary_check_icon.svg" alt="check">
                    <div class="order_number_text">
                        <p class="summary_number">2</p>
                        <p>Done</p>
                    </div>
                </div>
            </section>
            <section class="box_prio_tickets  margin_left style_boxes">
                <div class="counter_prio_tickets">
                    <img src="./assets/img/summary_prio_icon.svg" alt="prio">
                    <div class="order_number_text">
                        <p class="summary_number">3</p>
                        <p>Urgent</p>
                    </div>
                </div>
                <div class="divider_prio_box "></div>
                <div class="deadline_information">
                    <p class="date_of_deadline">October 16, 2022</p>
                    <p>Upcoming Deadline</p>
                </div>
            </section>
            <section class="order_ticket_box_below margin_left">
                    <div class="order_number_text style_boxes boxes_last_row">
                        <p class="summary_number">4</p>
                        <p class="style_text">Tasks in <br> Board</p>
                    </div>
                    <div class="order_number_text style_boxes boxes_last_row">
                        <p class="summary_number">5</p>
                        <p class="style_text">Tasks in <br> Progress</p>
                    </div>
                    <div class="order_number_text style_boxes boxes_last_row">
                        <p class="summary_number">6</p>
                        <p class="style_text">Awaiting <br> Feedback</p>
                    </div>
            </section>
        </div>
        <div class="order_greeting_username">
            <p class="style_greeting_text">Good morning,</p>
            <h1 class="style_username">Sofia Müller</h1>
        </div>
    `
}