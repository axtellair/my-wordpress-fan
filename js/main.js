// 导入工具模块
import { loadComponent } from "./utils/componentLoader.js";
import { createRevealObserver } from "./utils/scrollReveal.js";
import { validateContactForm, setFieldInvalid } from "./utils/formValidate.js";

// 导入产品数据
import { CEILING_FANS } from "./data/ceilingFan.js";
import { MOBILE_FANS } from "./data/mobileFan.js";
import { ACCESSORIES } from "./data/accessoryData.js";
import { APPLICATIONS } from "./data/appScene.js";
import { specRows, renderSpecTable } from "./render/renderSpecTable.js";

// 导入渲染函数
import { renderCeilingList } from "./render/renderCeiling.js";
import { renderMobileList } from "./render/renderMobile.js";
import { renderAccessoryList } from "./render/renderAccessory.js";
import { renderAppSceneGrid } from "./render/renderAppCard.js";

// 全局变量
let revealObserver;
let sortState = { key: null, dir: null };

// 1. 加载页面所有HTML组件
async function loadAllComponents() {
  await loadComponent('headerContainer', './components/header.html');
  const mainWrap = document.getElementById('mainWrap');
  mainWrap.innerHTML = `
    <section id="home" class="hero"></section>
    <section id="features" class="section section--light"></section>
    <section id="products" class="section section--dark"></section>
    <section id="specs" class="section section--light"></section>
    <section id="application" class="section section--dark"></section>
    <section id="contact" class="section section--light"></section>
  `;
  await loadComponent('home', './components/hero.html');
  await loadComponent('features', './components/section-features.html');
  await loadComponent('products', './components/section-products.html');
  await loadComponent('specs', './components/section-specs.html');
  await loadComponent('application', './components/section-application.html');
  await loadComponent('contact', './components/section-contact.html');
  await loadComponent('footerContainer', './components/footer.html');
}

// 2. 产品标签筛选渲染总入口
function renderProductTab(filter) {
  const productGrid = document.getElementById('productGrid');
  productGrid.innerHTML = '';
  if(filter === 'ceiling') renderCeilingList(CEILING_FANS, productGrid, revealObserver);
  if(filter === 'mobile') renderMobileList(MOBILE_FANS, productGrid, revealObserver);
  if(filter === 'accessory') renderAccessoryList(ACCESSORIES, productGrid, revealObserver);
}

// 3. 绑定全部页面交互
function bindAllInteraction() {
  // 标签切换
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderProductTab(tab.dataset.filter);
  }))

  // 导航产品跳转筛选
  document.querySelectorAll('[data-filter]').forEach(link => {
    link.addEventListener('click', (e) => {
      const f = link.dataset.filter;
      if(f) renderProductTab(f);
      document.getElementById('navLinks').classList.remove('mobile-open');
      const toggle = document.getElementById('navToggle');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.querySelector('i').className = 'fa-solid fa-bars';
    })
  })

  // 表格排序
  const specBody = document.getElementById('specBody');
  renderSpecTable(specRows, specBody);
  document.querySelectorAll('#specTable thead th').forEach(th => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const type = th.dataset.type;
      let dir = sortState.key === key && sortState.dir === 'asc' ? 'desc' : 'asc';
      sortState = {key, dir};
      const sorted = [...specRows].sort((a,b)=>{
        let va = a[key], vb = b[key];
        if(type === 'number') { va=Number(va)||0; vb=Number(vb)||0; return dir==='asc' ? va-vb : vb-va; }
        return dir==='asc' ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
      })
      renderSpecTable(sorted, specBody);
    })
  })

  // 应用场景渲染
  const appGrid = document.getElementById('appGrid');
  renderAppSceneGrid(appGrid, revealObserver);

  // 滚动导航变色
  const header = document.getElementById('header');
  window.addEventListener('scroll', ()=>{
    header.classList.toggle('scrolled', window.scrollY > 30);
  }, {passive:true})

  // 移动端菜单
  const navToggle = document.getElementById('navToggle');
  navToggle.addEventListener('click', ()=>{
    const open = document.getElementById('navLinks').classList.toggle('mobile-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.querySelector('i').className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  })

  // 移动端产品下拉展开
  document.querySelector('#productsNav button').addEventListener('click', (e)=>{
    if(window.innerWidth <=768){
      e.stopPropagation();
      document.getElementById('productsNav').classList.toggle('open');
    }
  })

  // 表单提交逻辑
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const successMsg = document.getElementById('formSuccess');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    successMsg.classList.remove('show');
    if(!validateContactForm()) return;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending…';
    setTimeout(()=>{
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Send Enquiry <i class="fa-solid fa-paper-plane"></i>';
      successMsg.classList.add('show');
      form.reset();
    },1400)
  })

  // 输入清除错误提示
  form.querySelectorAll('input,textarea').forEach(el=>{
    el.addEventListener('input', ()=>el.closest('.field').classList.remove('invalid'))
  })

  // 底部年份
  document.getElementById('year').textContent = new Date().getFullYear();
}

// 页面初始化总流程
async function initPage() {
  revealObserver = createRevealObserver();
  await loadAllComponents();
  renderProductTab('ceiling');
  bindAllInteraction();
  // 初始页面滚动导航激活项
  window.dispatchEvent(new Event('scroll'));
}

// 启动页面
initPage();
