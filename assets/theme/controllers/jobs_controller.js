import {Controller} from "stimulus";


export default class extends Controller{
    static targets = ["typeContainer","type","rightContainer","ctaDisplay"]
    connect() {

    }
    filterByJobType(e){
        this.typeContainerTarget.classList.toggle('visible')

    }
    filterItems(e) {
        const selectedType = e.target.getAttribute('data-type');
        const typeContainer = document.querySelector('.types-container')
        const allItems = typeContainer.querySelectorAll('[data-type]')
        const optionDisplay = document.querySelector('.overline');
        optionDisplay.textContent = selectedType;
        allItems.forEach(item => {
            if (item.getAttribute('data-type') === selectedType) {
                item.style.display = 'none';
            } else {
                item.style.display = '';
            }
        });
        const container = document.querySelector('.right');
        const jobGroups = container.querySelectorAll('.job-group');
        jobGroups.forEach(jobGroup => {
            const showType = jobGroup.getAttribute('data-job-type');

            if (showType === selectedType || selectedType === '') {
                jobGroup.style.display = 'block';
            } else {
                jobGroup.style.display = 'none';
            }
        });
        this.typeContainerTarget.classList.remove('visible')
    }
}
