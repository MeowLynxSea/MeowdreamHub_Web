// 创建 Toast 元素
var toastElement = document.createElement("div");
toastElement.id = "copySuccessToast";
toastElement.className = "toast align-items-center text-white bg-success border-0";
toastElement.setAttribute("role", "alert");
toastElement.setAttribute("aria-live", "assertive");
toastElement.setAttribute("aria-atomic", "true");
toastElement.setAttribute("data-bs-delay", "1200");

var toastBody = document.createElement("div");
toastBody.className = "d-flex justify-content-center";
toastElement.appendChild(toastBody);

var toastContent = document.createElement("div");
toastContent.className = "toast-body text-center";
toastContent.textContent = "文本已复制到剪贴板";
toastBody.appendChild(toastContent);

// 将 Toast 添加到文档中
document.body.appendChild(toastElement);

// CSS 样式
var toastStyle = document.createElement("style");
toastStyle.textContent = `
#copySuccessToast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    width: calc(min(200px,80vh));
    transform: translateX(-50%);
    transition: opacity 0.5s;
}
`;
document.head.appendChild(toastStyle);

// 初始化 Toast
var copyToast = new bootstrap.Toast(toastElement);

// 定义复制到剪贴板函数
function copyToClipboard(text) {
    // 创建一个临时的 textarea 元素
    var textarea = document.createElement("textarea");
    // 设置 textarea 的值为传入的文本
    textarea.value = text;
    // 将 textarea 设为不可见
    textarea.style.position = "fixed";
    textarea.style.opacity = 0;
    // 将 textarea 添加到文档中
    document.body.appendChild(textarea);
    // 选择 textarea 中的文本
    textarea.select();
    // 尝试复制文本到剪贴板
    document.execCommand("copy");
    // 删除 textarea 元素
    document.body.removeChild(textarea);

    copyToast.show();
}