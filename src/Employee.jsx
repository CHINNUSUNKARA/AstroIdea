import React from 'react';
import NavBar from './NavBar';
import './css/Employee.css';

const Employee = () => {
  return (
    <div className="employee-page">
      <NavBar />
      <form className='card-employee'>
      <h1 id="title">Post a job</h1>
      <p className='add'>Find the best talent for your company</p>
        <label htmlFor="job-title">Job Title</label>
        <input type="text" id="job-title" placeholder="Add job title, role vacancies etc" />

        <label htmlFor="tags-input" id='tags'>Tags</label>
        <input type="text" id="tags-input" placeholder="Job keyword, tags etc." />

        <label htmlFor="role-title" id='role-title'>Job Role</label>
        <select id="role-titl">
          <option value="">Select...</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
          <option value="manager">Manager</option>
        </select>
        <br />
        <br />

        <label>Salary</label>
        <br />
        <div className="salary-row">
          <div>
            <label htmlFor="min-salary">Min Salary</label>
            <input type="text" id="min-salary" placeholder="Minimum Salary" />
            <select name="currency" id="Currency-low">
            <option value="INR">INR - Indian Rupee</option>
            <option value="USD">USD - United States Dollar</option>
            <option value="EUR">EUR - Euro</option>
  
            <option value="GBP">GBP - British Pound Sterling</option>
             <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CHF">CHF - Swiss Franc</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="SEK">SEK - Swedish Krona</option>
              <option value="NZD">NZD - New Zealand Dollar</option>
              <option value="MXN">MXN - Mexican Peso</option>
              <option value="SGD">SGD - Singapore Dollar</option>
              <option value="HKD">HKD - Hong Kong Dollar</option>
              <option value="NOK">NOK - Norwegian Krone</option>
              <option value="KRW">KRW - South Korean Won</option>
              <option value="TRY">TRY - Turkish Lira</option>
              <option value="RUB">RUB - Russian Ruble</option>
              <option value="ZAR">ZAR - South African Rand</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="AED">AED - United Arab Emirates Dirham</option>
              <option value="ARS">ARS - Argentine Peso</option>
              <option value="CLP">CLP - Chilean Peso</option>
              <option value="CZK">CZK - Czech Koruna</option>
              <option value="DKK">DKK - Danish Krone</option>
              <option value="EGP">EGP - Egyptian Pound</option>
              <option value="HUF">HUF - Hungarian Forint</option>
              <option value="IDR">IDR - Indonesian Rupiah</option>
              <option value="ILS">ILS - Israeli New Shekel</option>
              <option value="KWD">KWD - Kuwaiti Dinar</option>
              <option value="MYR">MYR - Malaysian Ringgit</option>
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="PHP">PHP - Philippine Peso</option>
              <option value="PKR">PKR - Pakistani Rupee</option>
              <option value="PLN">PLN - Polish Zloty</option>
              <option value="QAR">QAR - Qatari Riyal</option>
              <option value="RON">RON - Romanian Leu</option>
              <option value="SAR">SAR - Saudi Riyal</option>
              <option value="THB">THB - Thai Baht</option>
              <option value="TWD">TWD - New Taiwan Dollar</option>
              <option value="UAH">UAH - Ukrainian Hryvnia</option>
              <option value="VND">VND - Vietnamese Dong</option>
            </select>

          </div>
          <div>
            <label htmlFor="max-salary">Max Salary</label>
            <input type="text" id="max-salary" placeholder="Maximum Salary" />
            <select name="maxCurrency" id="Max-currency">
          <option value="INR">INR - Indian Rupee</option>
          <option value="USD">USD - United States Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound Sterling</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="CHF">CHF - Swiss Franc</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="SEK">SEK - Swedish Krona</option>
          <option value="NZD">NZD - New Zealand Dollar</option>
          <option value="MXN">MXN - Mexican Peso</option>
          <option value="SGD">SGD - Singapore Dollar</option>
          <option value="HKD">HKD - Hong Kong Dollar</option>
          <option value="NOK">NOK - Norwegian Krone</option>
          <option value="KRW">KRW - South Korean Won</option>
          <option value="TRY">TRY - Turkish Lira</option>
          <option value="RUB">RUB - Russian Ruble</option>
          <option value="ZAR">ZAR - South African Rand</option>
          <option value="BRL">BRL - Brazilian Real</option>
          <option value="AED">AED - United Arab Emirates Dirham</option>
          <option value="ARS">ARS - Argentine Peso</option>
          <option value="CLP">CLP - Chilean Peso</option>
          <option value="CZK">CZK - Czech Koruna</option>
          <option value="DKK">DKK - Danish Krone</option>
          <option value="EGP">EGP - Egyptian Pound</option>
          <option value="HUF">HUF - Hungarian Forint</option>
          <option value="IDR">IDR - Indonesian Rupiah</option>
          <option value="ILS">ILS - Israeli New Shekel</option>
          <option value="KWD">KWD - Kuwaiti Dinar</option>
          <option value="MYR">MYR - Malaysian Ringgit</option>
          <option value="NGN">NGN - Nigerian Naira</option>
          <option value="PHP">PHP - Philippine Peso</option>
          <option value="PKR">PKR - Pakistani Rupee</option>
          <option value="PLN">PLN - Polish Zloty</option>
          <option value="QAR">QAR - Qatari Riyal</option>
          <option value="RON">RON - Romanian Leu</option>
          <option value="SAR">SAR - Saudi Riyal</option>
          <option value="THB">THB - Thai Baht</option>
          <option value="TWD">TWD - New Taiwan Dollar</option>
          <option value="UAH">UAH - Ukrainian Hryvnia</option>
          <option value="VND">VND - Vietnamese Dong</option>
        </select>

          </div>
          <div>
            <label htmlFor="salary-type">Type</label>
            <select id="salary-type">
              <option value="">Select...</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <label htmlFor="vacancies">Vacancies</label>
        <select id="vacancies">
          <option value="">Select...</option>
          <option value="1">1</option>
          <option value="2-5">2-5</option>
          <option value="5+">5+</option>  
        </select>

        <label htmlFor="job-level" id='job-lev'>Job Level</label>
        <select id="job-level">
          <option value="">Select...</option>
          <option value="entry">Entry</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
        <br />
        <br />
        <label htmlFor="">Location</label>
        <br />
         <label htmlFor="country">Country</label>
         <select id="country" name="country">
          <option value="">Select...</option>
          <option value="AF">Afghanistan</option>
          <option value="AL">Albania</option>
          <option value="DZ">Algeria</option>
          <option value="AO">Angola</option>
          <option value="AR">Argentina</option>
          <option value="AM">Armenia</option>
          <option value="AU">Australia</option>
          <option value="AT">Austria</option>
          <option value="AZ">Azerbaijan</option>
          <option value="BD">Bangladesh</option>
          <option value="BY">Belarus</option>
          <option value="BE">Belgium</option>
          <option value="BJ">Benin</option>
          <option value="BO">Bolivia</option>
          <option value="BA">Bosnia and Herzegovina</option>
          <option value="BR">Brazil</option>
          <option value="BG">Bulgaria</option>
          <option value="KH">Cambodia</option>
          <option value="CM">Cameroon</option>
          <option value="CA">Canada</option>
          <option value="CL">Chile</option>
          <option value="CN">China</option>
          <option value="CO">Colombia</option>
          <option value="CR">Costa Rica</option>
          <option value="HR">Croatia</option>
          <option value="CY">Cyprus</option>
          <option value="CZ">Czech Republic</option>
          <option value="DK">Denmark</option>
          <option value="DO">Dominican Republic</option>
          <option value="EG">Egypt</option>
          <option value="EE">Estonia</option>
          <option value="ET">Ethiopia</option>
          <option value="FI">Finland</option>
          <option value="FR">France</option>
          <option value="GE">Georgia</option>
          <option value="DE">Germany</option>
          <option value="GH">Ghana</option>
          <option value="GR">Greece</option>
          <option value="GT">Guatemala</option>
          <option value="HN">Honduras</option>
          <option value="HK">Hong Kong</option>
          <option value="HU">Hungary</option>
          <option value="IS">Iceland</option>
          <option value="IN">India</option>
          <option value="ID">Indonesia</option>
          <option value="IR">Iran</option>
          <option value="IQ">Iraq</option>
          <option value="IE">Ireland</option>
          <option value="IL">Israel</option>
          <option value="IT">Italy</option>
          <option value="JM">Jamaica</option>
          <option value="JP">Japan</option>
          <option value="JO">Jordan</option>
          <option value="KZ">Kazakhstan</option>
          <option value="KE">Kenya</option>
          <option value="KR">South Korea</option>
          <option value="KW">Kuwait</option>
          <option value="LA">Laos</option>
          <option value="LV">Latvia</option>
          <option value="LB">Lebanon</option>
          <option value="LY">Libya</option>
          <option value="LT">Lithuania</option>
          <option value="LU">Luxembourg</option>
          <option value="MY">Malaysia</option>
          <option value="MX">Mexico</option>
          <option value="MA">Morocco</option>
          <option value="NP">Nepal</option>
          <option value="NL">Netherlands</option>
          <option value="NZ">New Zealand</option>
          <option value="NG">Nigeria</option>
          <option value="NO">Norway</option>
          <option value="OM">Oman</option>
          <option value="PK">Pakistan</option>
          <option value="PA">Panama</option>
          <option value="PE">Peru</option>
          <option value="PH">Philippines</option>
          <option value="PL">Poland</option>
          <option value="PT">Portugal</option>
          <option value="QA">Qatar</option>
          <option value="RO">Romania</option>
          <option value="RU">Russia</option>
          <option value="SA">Saudi Arabia</option>
          <option value="RS">Serbia</option>
          <option value="SG">Singapore</option>
          <option value="SK">Slovakia</option>
          <option value="SI">Slovenia</option>
          <option value="ZA">South Africa</option>
          <option value="ES">Spain</option>
          <option value="LK">Sri Lanka</option>
          <option value="SE">Sweden</option>
          <option value="CH">Switzerland</option>
          <option value="SY">Syria</option>
          <option value="TW">Taiwan</option>
          <option value="TZ">Tanzania</option>
          <option value="TH">Thailand</option>
          <option value="TN">Tunisia</option>
          <option value="TR">Turkey</option>
          <option value="UA">Ukraine</option>
          <option value="AE">United Arab Emirates</option>
          <option value="GB">United Kingdom</option>
          <option value="US">United States</option>
          <option value="UZ">Uzbekistan</option>
          <option value="VE">Venezuela</option>
          <option value="VN">Vietnam</option>
          <option value="YE">Yemen</option>
          <option value="ZM">Zambia</option>
          <option value="ZW">Zimbabwe</option>
        </select>


        <label htmlFor="city" id='cit'>City</label>
        <select id="city">
          <option value="">Select...</option>
          <option value="hyd">Hyderabad</option>
          <option value="bang">Bangalore</option>
        </select>

        <label htmlFor="desc">Job Description</label>
        <textarea id="desc" placeholder="Add your description..." rows="12" />
        <div className="description-editor">
        <div className="desc-toolbar">
      <select className="font-size">
        <option>14</option>
        <option>16</option>
        <option>18</option>
        <option>20</option>
      </select>

      <button className="toolbar-btn">T</button>
      <div className="color-circle"></div>
      <button className="toolbar-btn"><strong>B</strong></button>
      <button className="toolbar-btn"><em>I</em></button>
      <button className="toolbar-btn"><u>U</u></button>
      <button className="toolbar-btn">S</button>

      <button className="toolbar-btn">≡</button>
      <button className="toolbar-btn">≡</button>
      <button className="toolbar-btn">≡</button>

      <button className="toolbar-btn">1.</button>
      <button className="toolbar-btn">•</button>

      <button className="toolbar-btn">🖼</button>
      <button className="toolbar-btn">🔗</button>
    </div>

  
</div>

        <button type="submit" className="post-button">Post Job</button>
      </form>
    </div>
  );
};

export default Employee;