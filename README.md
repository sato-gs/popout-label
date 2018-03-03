# POPOUT LABEL
[![POPOUT LABEL](http://plsgivejobs.com/popout-label/images/popout-label.jpg "POPOUT LABEL")](http://plsgivejobs.com/popout-label/popout-label.html)
Make your form interactive/space-saving and pop out form labels in an elegant and stylish manner with beautiful animation effects.
- [x] Easy To Use
- [x] Highly Customizable
- [x] Enhanced Accessibility With Label Elements
- [x] Automatic Form Validation
- [x] Advanced Manual Form Validation

## Licence
POPOUT LABEL is licensed under [GNU General Public License v3.0](LICENSE.md)

## Demo & Tutorial
[View Demo & Tutorial](http://plsgivejobs.com/popout-label/popout-label.html)

## How Tos
1. HTML
   - Step1 : Create a &lt;div&gt; container and assign the class, **"popout-container"** to it.
    ```html
    <div class="popout-container">

    </div>
    ```
   - Step2 : Create &lt;input&gt; or &lt;textarea&gt; inside the &lt;div&gt; and assign the class, **"popout-input"** to it.
    ```html
    <div class="popout-container">
      <input type="text" class="popout-input">
    </div>
    
    <div class="popout-container">
      <input type="email" class="popout-input">
    </div>
    
    <div class="popout-container">
      <input type="password" class="popout-input">
    </div>
    
    <div class="popout-container">
      <input type="password" class="popout-input">
    </div>
    
    <div class="popout-container">
      <textarea class="popout-input"></textarea>
    </div>
    ```
   - Step3 : Add the following attributes: **id**, **data-placeholder**, and **data-type**.
      - **id** is used for &lt;label&gt;, which will be dynamically created.
      - **data-placeholder** is used as a placeholder/label text.
      - **data-type** is used for form validation: you can choose between **"text"**, **"email"**, **"password"**, **"confirm-password"**, and **"textarea"**. For instance, (1) &lt;input&gt;/&lt;textarea&gt; with data-type="text"/"textarea" has to have more than any one character, (2) &lt;input&gt; with data-type="email" has to be in a valid email format, and (3) &lt;input&gt; with data-type="confirm-password" has to match a "Password" field.
    ```html
    <div class="popout-container">
      <input type="text" class="popout-input" id="username" data-placeholder="Username" data-type="text">
    </div>
    
    <div class="popout-container">
      <input type="email" class="popout-input" id="email" data-placeholder="Email Address" data-type="email">
    </div>

    <div class="popout-container">
      <input type="password" class="popout-input" id="password" data-placeholder="Password" data-type="password">
    </div>

    <div class="popout-container">
      <input type="password" class="popout-input" id="confirm-password" data-placeholder="Confirm Password" data-type="confirm-password">
    </div>

    <div class="popout-container">
      <textarea class="popout-input" id="message" data-placeholder="Message" data-type="textarea"></textarea>
    </div>
    ```
   - Step4 **(Optional)** : Add the following optional attribute as necessary: **data-regex**.
      - **data-regex** is used to override default regular expressions associated with each data-type. In another word, you can manually set customized validation rules as follows.
   ```html
   <div class="popout-container">
     <input type="text" class="popout-input" id="username" data-placeholder="Your Name" data-type="text" data-regex=".{6,}">
   </div>

   <div class="popout-container">
     <input type="text" class="popout-input" id="email" data-placeholder="Email Address" data-type="email" data-regex="[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}">
   </div>

   <div class="popout-container">
     <input type="text" class="popout-input" id="url" data-placeholder="URL" data-type="text" data-regex="((\bhttps?:\/\/)|(\bwww\.))\S*">
   </div>
   ```
2. CSS **(Optional)**
   - Use the attached CSS file (validation_icons.css) for default validation elements/icons.
3. JavaScript
   - Step1 : This is a jQuery plugin, so make sure to include [the latest jQuery](http://jquery.com/download/).
   - Step2 : Include my plugin (popout_label.js).
   - Step3 : Now all you have to do is call **"popoutLabel ( )"** in your JavaScript code.
   ```javascript
   $("body").popoutLabel();
   ```
   - Step4 : If you would like to customize settings, pass an object containing properties/values as follows. **Please visit [here](http://plsgivejobs.com/popout-label/popout-label.html) for more information on customization**.
   ```javascript
   $("body").popoutLabel({
     targetForm : 'form',              // Specifies which <form> element you would like to use POPOUT LABEL on
     unvalidated : '<span></span>',    // Specifies an element/icon for the "not validated yet" mark
     validated : '<span></span>',      // Specifies an element/icon for the "validated" mark
     popoutOnLoad : true,              // Specifies whether labels pop out as soon as a page loads
     inputOffset : 0,                  // Specifies spacing between pop-out labels and <input>
     textareaOffset : 0,               // Specifies spacing between pop-out labels and <textarea>
     position : 'top',                 // Specifies where pop-out labels appear relative to <input>/<textarea>
     easing : 'bounce',                // Specifies the easing method of animation
     animationDuration : 500,          // Specifies the duration of animation
     animationEffect : 'front',        // Specifies how labels pop out of <input>/<textarea>
     labelColor : 'default',           // Specifies the color of pop-out labels as they appear
     labelFontSize : 'default',        // Specifies the font size of pop-out labels as they appear
     labelFontWeight : 'default',      // Specifies the font weight for pop-out labels as they appear
     labelLetterSpacing : 'default',   // Specifies the letter spacing for pop-out labels as they appear
     labelWordSpacing : 'default',     // Specifies the word spacing for pop-out labels as they appear
     labelTextShadow : 'default',      // Specifies the text shadows of pop-out labels as they appear
   });
   ```

## Other Resources
Visit [here](http://plsgivejobs.com/popout-label/popout-label.html) for more information on default options and customization
