import { Controller } from "stimulus"

export default class extends Controller {
    static targets = ["input", "button","allCourse", "openValue","optionDisplay","item", "showPlaceholder", 'item', "checkboxInput"]

    connect() {
    }

    validateForm() {
        let isValid = true;

        if (this.inputTargets) {
            this.inputTargets.forEach(input => {
                if (!input.value) {
                    input.classList.add('error-border');
                    isValid = false;
                } else {
                    input.classList.remove('error-border');
                }
            });
        } else {
            isValid = false;
        }
        const selects = document.querySelectorAll('.custom-select');
        selects.forEach(select => {
            const input = select.querySelector('input[type="hidden"]');
            if (!input.value) {
                select.classList.add('error-border');
                isValid = false;
            } else {
                select.classList.remove('error-border');
            }
        });

        const checkbox = this.checkboxInputTarget.querySelector('input[type="checkbox"]');
        if (!checkbox.checked) {
            checkbox.classList.add('error-border');
            isValid = false;
        } else {
            checkbox.classList.remove('error-border');
        }

        if (isValid) {
            this.resetForm();
        }
    }
    openOptions(e){
        const customSelect = event.currentTarget.closest('.custom-select');
        const options = customSelect.querySelector('.options-value');
        options.classList.toggle('open-course');
    }

    selectedCourse(event) {
        const selectedOption = event.target.getAttribute('data-value');
        const customSelect = event.target.closest('.custom-select');
        const optionContainer = customSelect.querySelector('.options-value');
        const allOptions = optionContainer.querySelectorAll('.option-item');
        allOptions.forEach(option => {
            if (option.getAttribute('data-value') === selectedOption) {
                option.style.display = 'none';
            } else {
                option.style.display = 'block';
            }
        });
        const optionDisplay = customSelect.querySelector('.option-display');
        optionDisplay.textContent = selectedOption;
        const hiddenInput = customSelect.querySelector('input[type="hidden"]');
        if (hiddenInput) {
            hiddenInput.value = selectedOption;
        }
        optionContainer.classList.remove('open-course')
    }
    resetForm(){
        if (this.inputTargets) {
            this.inputTargets.forEach(input => {
                if (!input.value){
                    input.classList.add('error-border');
                }
                else {
                    input.value = ''
                }

            });
        } else {
            console.error('No input targets found!');
        }
        const checkbox = this.checkboxInputTarget.querySelector('input[type="checkbox"]');
        if (checkbox) {
            checkbox.checked = false;
        }
        const selects = document.querySelectorAll('.custom-select');
        selects.forEach(select => {
            const hiddenInput = select.querySelector('input[type="hidden"]');
            if (hiddenInput) hiddenInput.value = '';
            const defaultLabel = select.querySelector('.all-course')?.textContent?.trim() || 'Select';
            const display = select.querySelector('.option-display');
            if (display) display.textContent = defaultLabel;
            select.classList.remove('error-border');
            const allOptions = select.querySelectorAll('.option-item');
            allOptions.forEach(option => {
                option.style.display = 'block';
            });
        });
    }

}


