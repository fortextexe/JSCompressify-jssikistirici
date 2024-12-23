function compressJS() {
            let jsCode = document.getElementById('jsInput').value;
            const loading = document.getElementById('loading');
            const resultDiv = document.getElementById('result');
            
            if (!jsCode) {
                alert("Lütfen bir JavaScript kodu girin.");
                return;
            }

            loading.style.display = 'block';
            resultDiv.style.display = 'none';

            jsCode = jsCode.replace(/\/\/[^\n]*\n/g, ""); 
            jsCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, ""); 
            jsCode = jsCode.replace(/(["'`])[\s\S]*?\1/g, function(match) {
                return match.replace(/\s+/g, " ");
            });
            jsCode = jsCode.replace(/\s+/g, " ");
            jsCode = jsCode.replace(/^\s+|\s+$/g, "");
            jsCode = jsCode.replace(/\n/g, "");

            resultDiv.textContent = jsCode;
            loading.style.display = 'none';
            resultDiv.style.display = 'block';

            let copyIcon = document.createElement("div");
            copyIcon.classList.add("copy-icon");
            copyIcon.innerHTML = '<i class="fas fa-copy"></i>';
            copyIcon.onclick = copyToClipboard;
            resultDiv.appendChild(copyIcon);
        }

        function copyToClipboard() {
            const resultText = document.getElementById('result').textContent;
            
            if (!resultText) {
                alert("Önce JavaScript kodunu sıkıştırın!");
                return;
            }

            navigator.clipboard.writeText(resultText).then(() => {
                const copyIcon = document.querySelector('.copy-icon');
                copyIcon.classList.add('copy-animation');
                showToast();
                
                setTimeout(() => {
                    copyIcon.classList.remove('copy-animation');
                }, 1500);
            }).catch(err => {
                console.error('Panoya kopyalama başarısız:', err);
                alert("Panoya kopyalama işlemi başarısız oldu :(");
            });
        }

        function showToast() {
            const toast = document.getElementById('toast');
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
            }, 2000);
        }
