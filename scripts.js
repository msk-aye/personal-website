// scripts.js
document.addEventListener("DOMContentLoaded", () => {
    console.log("Document loaded and parsed.");

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const sectionID = event.target.getAttribute('href').substring(1);
            document.getElementById(sectionID).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Attach click event listeners to each "Read More" button
    document.querySelectorAll('.expand-btn').forEach((button) => {
        button.addEventListener('click', () => {
            const project = button.closest('.project');
            project.classList.toggle('expanded'); // Toggle the "expanded" class

            // Update button text based on the expanded state
            if (project.classList.contains('expanded')) {
                button.textContent = 'Read Less';
            } else {
                button.textContent = 'Read More';
            }
        });
    });
});

//     // Toggle Project Overlay
//     const projects = document.querySelectorAll('.project');
//     const overlay = document.getElementById('project-overlay');
//     const overlayContent = overlay.querySelector('.project-details');

//     projects.forEach(project => {
//         const expandBtn = project.querySelector('.expand-btn');
//         expandBtn.addEventListener('click', () => {
//             // Fetch project data
//             const projectId = project.getAttribute('data-project');
//             loadProjectDetails(projectId);
//         });
//     });

//     function loadProjectDetails(projectId) {
//         // Clear previous content
//         overlayContent.innerHTML = '';

//         // Open the overlay
//         overlay.classList.add('active');
//         document.body.classList.add('overlay-active');

//         // Generate project HTML
//         let projectHTML = '';

//         switch (projectId) {
//             case 'engg1100':
//                 projectHTML = `
//                     <h3>Remote Firefighting Vehicle</h3>
//                     <p>Detailed description of the Remote Firefighting Vehicle project...</p>
//                     <!-- Add code samples or additional details as needed -->
//                 `;
//                 break;
//             case 'coms3200':
//                 projectHTML = `
//                     <h3>Python Chat Server (COMS3200)</h3>
//                     <p>Detailed description of the Python Chat Server project...</p>
//                     <div class="code-section">
//                         <div class="code-buttons">
//                             <button data-code="code1" class="active">Python Code</button>
//                         </div>
//                         <pre><code id="code-display" class="language-python"></code></pre>
//                     </div>
//                 `;
//                 break;
//             case 'elec3004':
//                 projectHTML = `
//                     <h3>Image Reconstruction (ELEC3004)</h3>
//                     <p>Detailed description of the Image Reconstruction project...</p>
//                     <!-- Add code samples or additional details as needed -->
//                 `;
//                 break;
//             case 'engg2800':
//                 projectHTML = `
//                     <h3>PEEP Watch</h3>
//                     <p>Detailed description of the PEEP Watch project...</p>
//                     <!-- Add code samples or additional details as needed -->
//                 `;
//                 break;
//             case 'csse3010':
//                 projectHTML = `
//                     <h3>Embedded Microcontroller Programming (CSSE3010)</h3>
//                     <p>Detailed description of the Embedded Microcontroller Programming project...</p>
//                     <div class="code-section">
//                         <div class="code-buttons">
//                             <button data-code="code1" class="active">C Code</button>
//                         </div>
//                         <pre><code id="code-display" class="language-c"></code></pre>
//                     </div>
//                 `;
//                 break;
//             case 'cybr3000':
//                 projectHTML = `
//                     <h3>Firewall and Intrusion Detection System</h3>
//                     <p>Detailed description of the Firewall and IDS project...</p>
//                     <div class="code-section">
//                         <div class="code-buttons">
//                             <button data-code="code1" class="active">Python Code</button>
//                         </div>
//                         <pre><code id="code-display" class="language-python"></code></pre>
//                     </div>
//                 `;
//                 break;
//             case 'comp3506':
//                 projectHTML = `
//                     <h3>Functional Programming</h3>
//                     <p>Detailed description of the Functional Programming project...</p>
//                     <div class="code-section">
//                         <div class="code-buttons">
//                             <button data-code="code1" class="active">Haskell Code</button>
//                         </div>
//                         <pre><code id="code-display" class="language-haskell"></code></pre>
//                     </div>
//                 `;
//                 break;
//             default:
//                 projectHTML = `<p>Project details not found.</p>`;
//         }

//         overlayContent.innerHTML = projectHTML;

//         // Attach event listener for close button here
//         const closeBtn = overlay.querySelector('.close-btn');
//         closeBtn.addEventListener('click', closeOverlay);

//         // Load the first code sample by default
//         loadCodeSample(projectId, 'code1');

//         // Add event listeners for code buttons
//         const codeButtons = overlayContent.querySelectorAll('.code-buttons button');
//         codeButtons.forEach(button => {
//             button.addEventListener('click', () => {
//                 // Remove 'active' class from all buttons
//                 codeButtons.forEach(btn => btn.classList.remove('active'));
//                 // Add 'active' class to the clicked button
//                 button.classList.add('active');
//                 // Load the corresponding code sample
//                 const codeId = button.getAttribute('data-code');
//                 loadCodeSample(projectId, codeId);
//             });
//         });
//     }

//     function loadCodeSample(projectId, codeId) {
//         const codeDisplay = document.getElementById('code-display');
//         let codeContent = '';
//         let languageClass = '';

//         if (projectId === 'coms3200') {
//             if (codeId === 'code1') {
//                 codeContent = `
// # Sample Python code for Chat Server
// import socket
// # ... rest of your code ...
//                 `;
//                 languageClass = 'language-python';
//             }
//         } else if (projectId === 'csse2010') {
//             if (codeId === 'code1') {
//                 codeContent = `
// /* Sample C code for Embedded Microcontroller */
// #include <stdio.h>
// int main() {
//     // Your embedded C code here
//     return 0;
// }
//                 `;
//                 languageClass = 'language-c';
//             }
//         } else if (projectId === 'cybr3000') {
//             if (codeId === 'code1') {
//                 codeContent = `
// # Sample Python code for Firewall and IDS
// def detect_intrusion(packet):
//     # Your code here
//     pass
//                 `;
//                 languageClass = 'language-python';
//             }
//         } 
//         // Add code samples for other projects as needed

//         if (codeDisplay) {
//             // Set the code content and language class
//             codeDisplay.className = '';
//             codeDisplay.classList.add(languageClass);
//             codeDisplay.textContent = codeContent.trim();

//             // Re-highlight the code block
//             Prism.highlightElement(codeDisplay);
//         }
//     }

//     function closeOverlay() {
//         overlay.classList.remove('active');
//         document.body.classList.remove('overlay-active');
//         overlayContent.innerHTML = '';
//     }
