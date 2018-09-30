import '../styles/index.scss';
import bareApi from './api/boostercamp.api';

const getElements = () => ({
  form: document.querySelector('#contact'),
  firstname: document.querySelector('#firstname_id'),
  lastname: document.querySelector('#name_id'),
  toolid: document.querySelector('#license_id'),
  btnNameMe: document.querySelector('#button_name_me_id'),
  btnSaveMe: document.querySelector('#button_save_me_id'),
  resultMessage: document.querySelector('#result_id'),
  list: document.querySelector('#list_id'),
});

const toolTemplate = (tool) => (`
  <p name="${tool.name}">${tool.htmlcode}</p>
`);

const boxHtml = (soatien, toolHtml) => (`
  <li class="box">
    ${soatien.name}
    ${soatien.firstname}
    ${toolHtml}
  </li>
`);

const renderApp = () => {
  // retrieve Elements
  const el = getElements();

  // Build Soatien list
  function buildSoatiens([soatiens, tools]) {
    let listSoatiens = '';

    soatiens.forEach((soatien) => {
      const tool = tools.filter(item => Number(item.id) === Number(soatien.toolid));
      const toolHtml = tool.length ? toolTemplate(tool[0]) : '';
      listSoatiens += boxHtml(soatien, toolHtml);
    });

    el.list.innerHTML = listSoatiens;
  }

  // Handle Name Me
  function handleNameMe() {
    el.resultMessage.innerHTML = `Hello ${el.firstname.value} ${el.lastname.value}`;
  }

  // get all data
  function loadData() {
    Promise.all([bareApi.getSoatiens(), bareApi.getTools()]).then(buildSoatiens);
  }

  // is form valid ?
  function checkForm() {
    return !!(
      el.firstname.value
      && el.lastname.value
      && el.toolid.value
      && [1, 2, 3].includes(Number(el.toolid.value))
    );
  }

  // post new soatien
  function saveSoatien() {
    const soatien = {
      firstname: el.firstname.value,
      name: el.lastname.value,
      toolid: el.toolid.value,
    };
    bareApi.postSoatiens(soatien).then(() => {
      el.resultMessage.innerHTML = 'Sauvegarde effectuée.';
      loadData();
    });
  }

  // Handle Save Name
  function handleSaveMe() {
    const isFormValid = checkForm();
    if (!isFormValid) {
      el.resultMessage.innerHTML = 'Veuillez saisir des informations valides.';

      return;
    }
    saveSoatien();
  }

  // Set components
  el.btnNameMe.addEventListener('click', handleNameMe);
  el.btnSaveMe.addEventListener('click', handleSaveMe);
  loadData();
}

document.addEventListener('DOMContentLoaded', renderApp);
