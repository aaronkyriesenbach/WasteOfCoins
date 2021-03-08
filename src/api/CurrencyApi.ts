import axios, { AxiosInstance } from 'axios';
import { convert } from 'cashify';

export default class CurrencyApi {
    api: AxiosInstance;
    rates: any;

    constructor() {
        this.api = axios.create();
        axios.get('https://api.exchangeratesapi.io/latest?base=USD')
            .then(res => {
                this.rates = res.data.rates;
            })
            .catch(() => this.rates = FALLBACK_RATES);
    }

    public convert(value: number, from: string, to: string) {
        const { rates } = this;

        return convert(value, { from, to, base: 'USD', rates });
    }
}

const FALLBACK_RATES = {
    "AED": 3.673011,
    "AFN": 77.434176,
    "ALL": 103.506553,
    "AMD": 523.474918,
    "ANG": 1.795645,
    "AOA": 624.234,
    "ARS": 90.5436,
    "AUD": 1.299658,
    "AWG": 1.8,
    "AZN": 1.700805,
    "BAM": 1.639738,
    "BBD": 2,
    "BDT": 84.824161,
    "BGN": 1.64179,
    "BHD": 0.376859,
    "BIF": 1946.145384,
    "BMD": 1,
    "BND": 1.341689,
    "BOB": 6.89739,
    "BRL": 5.6929,
    "BSD": 1,
    "BTC": 0.000019873713,
    "BTN": 72.826284,
    "BWP": 11.145857,
    "BYN": 2.610802,
    "BZD": 2.01639,
    "CAD": 1.266041,
    "CDF": 1979.185887,
    "CHF": 0.932315,
    "CLF": 0.026579,
    "CLP": 733.399123,
    "CNH": 6.52921,
    "CNY": 6.5147,
    "COP": 3657.392587,
    "CRC": 612.641403,
    "CUC": 1,
    "CUP": 25.75,
    "CVE": 93,
    "CZK": 22.142455,
    "DJF": 178.088893,
    "DKK": 6.252731,
    "DOP": 57.830095,
    "DZD": 133.049368,
    "EGP": 15.71,
    "ERN": 14.999636,
    "ETB": 40.485341,
    "EUR": 0.840831,
    "FJD": 2.03385,
    "FKP": 0.723955,
    "GBP": 0.723955,
    "GEL": 3.325,
    "GGP": 0.723955,
    "GHS": 5.742012,
    "GIP": 0.723955,
    "GMD": 51.4,
    "GNF": 10140.080201,
    "GTQ": 7.71012,
    "GYD": 209.285989,
    "HKD": 7.76741,
    "HNL": 24.088466,
    "HRK": 6.348667,
    "HTG": 77.810612,
    "HUF": 308.639957,
    "IDR": 14347.753021,
    "ILS": 3.324973,
    "IMP": 0.723955,
    "INR": 73.028,
    "IQD": 1459.50056,
    "IRR": 42105,
    "ISK": 128.58,
    "JEP": 0.723955,
    "JMD": 149.591252,
    "JOD": 0.709,
    "JPY": 108.4205,
    "KES": 109.65,
    "KGS": 84.631162,
    "KHR": 4071.406893,
    "KMF": 413.350013,
    "KPW": 900,
    "KRW": 1133.401112,
    "KWD": 0.302949,
    "KYD": 0.833602,
    "KZT": 420.129849,
    "LAK": 9367.128675,
    "LBP": 1512.519854,
    "LKR": 196.066591,
    "LRD": 173.924986,
    "LSL": 15.299951,
    "LYD": 4.475781,
    "MAD": 9.001819,
    "MDL": 17.606003,
    "MGA": 3771.193175,
    "MKD": 51.657068,
    "MMK": 1410.479141,
    "MNT": 2853.585667,
    "MOP": 7.999111,
    "MRO": 356.999828,
    "MRU": 35.932326,
    "MUR": 39.950002,
    "MVR": 15.4,
    "MWK": 781.575764,
    "MXN": 21.358633,
    "MYR": 4.092,
    "MZN": 74.572,
    "NAD": 15.36,
    "NGN": 381.25,
    "NIO": 34.912449,
    "NOK": 8.545786,
    "NPR": 116.522054,
    "NZD": 1.398196,
    "OMR": 0.384765,
    "PAB": 1,
    "PEN": 3.685287,
    "PGK": 3.557463,
    "PHP": 48.677873,
    "PKR": 157.128399,
    "PLN": 3.855826,
    "PYG": 6669.844364,
    "QAR": 3.696606,
    "RON": 4.10455,
    "RSD": 98.526957,
    "RUB": 74.004,
    "RWF": 993.836137,
    "SAR": 3.7517,
    "SBD": 8.016037,
    "SCR": 21.193555,
    "SDG": 380,
    "SEK": 8.545793,
    "SGD": 1.34576,
    "SHP": 0.723955,
    "SLL": 10201.749953,
    "SOS": 578.737346,
    "SRD": 14.154,
    "SSP": 130.26,
    "STD": 20337.466992,
    "STN": 20.75,
    "SVC": 8.753537,
    "SYP": 512.827239,
    "SZL": 15.309174,
    "THB": 30.730004,
    "TJS": 11.398928,
    "TMT": 3.51,
    "TND": 2.743,
    "TOP": 2.283438,
    "TRY": 7.533323,
    "TTD": 6.790216,
    "TWD": 28.06,
    "TZS": 2318.5,
    "UAH": 27.77196,
    "UGX": 3659.300684,
    "USD": 1,
    "UYU": 43.923162,
    "UZS": 10451.520797,
    "VES": 1879603.226415,
    "VND": 23115.600439,
    "VUV": 108.543978,
    "WST": 2.514511,
    "XAF": 551.549187,
    "XAG": 0.03923569,
    "XAU": 0.00058661,
    "XCD": 2.70255,
    "XDR": 0.698319,
    "XOF": 551.549187,
    "XPD": 0.00042488,
    "XPF": 100.337866,
    "XPT": 0.00087836,
    "YER": 250.350066,
    "ZAR": 15.397685,
    "ZMW": 21.937415,
    "ZWL": 322
};