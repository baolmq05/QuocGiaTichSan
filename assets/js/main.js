const MINUTES_TO_SALE = 1440; // 24 tiếng

function startCountdown() {
    // Mỗi lần gọi hàm (reload trang) là lấy mốc hiện tại làm mốc bắt đầu
    let startTime = new Date().getTime();
    const targetTime = startTime + (MINUTES_TO_SALE * 60 * 1000);

    const x = setInterval(function () {
        let currentTime = new Date().getTime();
        let distance = targetTime - currentTime;

        // Tính toán thời gian
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Hàm render cập nhật giao diện
        const update = (id, val) => {
            const el = document.getElementById(id);
            if (el) {
                let formatted = val < 10 ? "0" + val : val;
                if (el.innerHTML !== formatted.toString()) {
                    el.innerHTML = formatted;
                }
            }
        };

        update("days", days);
        update("hours", hours);
        update("minutes", minutes);
        update("seconds", seconds);

        // Khi hết thời gian
        if (distance < 0) {
            clearInterval(x);
            const container = document.getElementById("countdown");
            if (container) {
                container.innerHTML = "<h4 class='text-danger'>HẾT THỜI GIAN ƯU ĐÃI!</h4>";
            }
        }
    }, 1000);
}

// Chạy hàm khi trang load xong
document.addEventListener('DOMContentLoaded', startCountdown);

var iframe = document.querySelector('iframe');
iframe.onload = function () {
    // Khi iframe load lại (nghĩa là đã gửi xong và chuyển trang)
    // Chúng ta cuộn trang web lên đúng vị trí của Section Order
    // iframe.style.height = "500px";
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
};