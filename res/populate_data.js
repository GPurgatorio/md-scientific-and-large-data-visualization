/*        INIT VARS         */

var values = document.getElementsByClassName("stats__amount")
var stats_values = document.getElementsByClassName("stats__value")
var regions = document.getElementsByClassName("region");
var btns = document.getElementsByClassName("btn btn-secondary");

var pos_stats = document.getElementsByClassName("stats__value--positive")
var neg_stats = document.getElementsByClassName("stats__value--negative")
var title_text = document.getElementsByClassName("box__header-title")[0]

var stored_stats = "";
var stored_reg = "";
var focus_on_click = false;

let data_2017;
let data_2018;
let stacked_layout_2017;
let stacked_layout_2018;

let chart_height = screen.availHeight /2.5;

/*        DATA        */

var data = {
    
    population: {
        abruzzo: "1.322.247,11,8.3e-6",
        basilicata: "570.365,6,1.0e-5",
        calabria: "1.965.128,10,5.0e-6",
        campania: "5.839.084,60,1.0e-5",
        emiliaR: "4.448.841,54,1.2e-5",
        friuliVG: "1.217.872,16,1.3e-5",
        lazio: "5.898.124,14,2.3e-6",
        liguria: "1.565.307,13,8.3e-6",
        lombardia: "10.019.166,96,9.5e-6",
        marche: "1.538.055,13,8.4e-6",
        molise: "310.449,2,6.4e-6",
        piemonte: "4.392.526,23,5.2e-6",
        puglia: "4.063.888,35,8.6e-6",
        sardegna: "1.653.135,13,7.8e-6",
        sicilia: "5.056.641,76,1.5e-5",
        toscana: "3.742.437,44,1.1e-5",
        trentinoAA: "1.062.860,18,1.6e-5",
        umbria: "888.908,5,5.6e-6",
        valleDA: "126.883,2,1.5e-5",
        veneto: "4.907.529,42,8.5e-6"
    },

    2016: {
        abruzzo: "406.334,146.560,233.218,26.556",
        basilicata: "",
        calabria: "563.404,245.863,278.091,39.450",
        campania: "1.699.324,597.010,985.179,117.135",
        emiliaR: "1.942.407,423.530,1.403.305,1.115.572",
        friuliVG: "",
        lazio: "1.276.895,580.639,696.256,0",
        liguria: "537.364,180.658,321.035,35.671",
        lombardia: "3.444.198,846.461,1.587.607,196.220",
        marche: "947.075,158.525,706.738,81.812",
        molise: "105.828,47.856,51.595,6377",
        piemonte: "1.562.630,629.512,617.548,315.570",
        puglia: "1.261.441,417.548,762.267,81.626",
        sardegna: "514.966,169.939,345.027,0",
        sicilia: "2.071.439,549.751,1.021.688,500.000",
        toscana: "1.682.799,741.825,866.010,74.964",
        trentinoAA: "",
        umbria: "448.838,98.106,350.732,0",
        valleDA: "",
        veneto: "1.686.714,435.494,1.152.819,98.401",
        mean: "1.259.478,391.829,711.194,168.084",
        max: "3444198",
        min: "105828"
    },
  
  
    2017: {
        abruzzo: "276.955,102.797,239.587,20.871",
        basilicata: "",
        calabria: "379.229,172.447,168.836,37.946",
        campania: "1.283.339,505.201,778.138,0",
        emiliaR: "1.055.762,141.604,682.828,75.869",
        friuliVG: "",
        lazio: "812.655,450.655,362.000,0",
        liguria: "338.334,172.009,185.894,25.727",
        lombardia: "2.024.196,593.706,1.430.490,0",
        marche: "321.051,111.189,183.010,26.851",
        molise: "72.015,33.576,38.449,0",
        piemonte: "757.722,255.881,406.462,50.000",
        puglia: "838.642,292.867,486.314,59.461",
        sardegna: "337.738,124.196,188.326,25.216",
        sicilia: "1.399.467,497.567,1.317.155,102.168",
        toscana: "894.305,331.128,563.176,0",
        trentinoAA: "",
        umbria: "165.988,68.811,97.177,0",
        valleDA: "",
        veneto: "972.428,305.450,604.957,62.000",
        mean: "745.614,259.942,483.299,30.381",
        max: "2024196",
        min: "72015"
    },
  
    2018: {
        abruzzo: "636.785,161.700,442.255,32.830",
        basilicata: "",
        calabria: "668.295,271.259,341.961,55.073",
        campania: "1.959.458,658.944,1.170.462,130.051",
        emiliaR: "1.778.010,467.544,1.179.419,51.046",
        friuliVG: "",
        lazio: "1.433.854,480.000,953.854,0",
        liguria: "562.275,303.147,322.486,40.468",
        lombardia: "3.131.788,2.056.979,1.976.313,498.496",
        marche: "524.036,174.900,313.626,35.510",
        molise: "129.959,52.800,77.159,0",
        piemonte: "1.231.791,446.051,757.911,0",
        puglia: "1.384.527,460.678,1.003.105,93.531",
        sardegna: "545.706,195.359,310.682,39.663",
        sicilia: "1.664.659,497.567,1.317.155,105.030",
        toscana: "1.459.531,432.300,1.027.231,0",
        trentinoAA: "",
        umbria: "266.772,90.000,158.532,0",
        valleDA: "",
        veneto: "1.584.216,480.479,1.006.184,97.552",
        max: "3131788",
        min: "129959"
    },

    // Plotly related

    sunburst: {
        2016: {
            abruzzo: "146560,233218,26556",
            basilicata: "1,1,1",
            calabria: "245863,278091,39450",
            campania: "597010,985179,117135",
            emiliaR: "423530,1403305,1115572",
            friuliVG: "1,1,1",
            lazio: "580639,696256,0",
            liguria: "180658,321035,35671",
            lombardia: "846461,1587607,196220",
            marche: "158525,706738,81812",
            molise: "47856,51595,6377",
            piemonte: "629512,617548,315570",
            puglia: "417548,762267,81626",
            sardegna: "169939,345027,0",
            sicilia: "549751,1021688,500000",
            toscana: "741825,866010,74964",
            trentinoAA: "1,1,1",
            umbria: "98106,350732,0",
            valleDA: "1,1,1",
            veneto: "435494,1152819,98401",
        },
        2017: {
            abruzzo: "37500,503950,0,__NEW__February 2019:15000,__OLD__February 2019:49120;April 2019:142106;March 2020:32160,__EXT__Unknown Data:0",
            basilicata: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            calabria: "200000,180890,35012,__NEW__October 2019:90000,__OLD__July 2019:56971;October 2019:21696;March 2020:13578;April 2020:13578;May 2020:10848,__EXT__Unknown Data:0",
            campania: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            emiliaR: "141604,682829,75869,__NEW__April 2020:134486,__OLD__November 2018:7515;February 2019:675313,__EXT__Unknown Data:0",
            friuliVG: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            lazio: "199013,476000,0,__NEW__December 2019:199013,__OLD__December 2019:362000,__EXT__Unknown Data:0",
            liguria: "166300,185894,0,__NEW__December 2019:116410,__OLD__October 2018:176313,__EXT__Unknown Data:0",
            lombardia: "593706,1430490,0,__NEW__July 2019:356223,__OLD__July 2019:845578,__EXT__Unknown Data:0",
            marche: "111189,183010,26851,__NEW__July 2019:69020;October 2019:42168,__OLD__December 2018:49532;March 2019:7560;July 2019:41972;ND:13425,__EXT__December 2018:13425",
            molise: "33576,38449,0,__NEW__October 2018:33566,__OLD__October 2018:38449,__EXT__Unknown Data:0",
            piemonte: "349232,561669,0,__NEW__Unknown Data:11532;December 2018:167364;March 2019:10800;April 2019:42537;November 2019:39112;March 2020:24857;April 2020:6000,__OLD__December 2018:219103;April 2019:116486;March 2020:89467,__EXT__Unknown Data:0",
            puglia: "292866,486313,59460,__NEW__December 2018:29286;July 2019:117145;December 2019:19524;January 2020:39048;April 2020:19524;May 2020:9762,__OLD__April 2019:30155;May 2019:277467;June 2019:66347;December 2019:15077,__EXT__December 2018:59460",
            sardegna: "0,301439,0,__NEW__Unknown Data:0,__OLD__May 2019:301439,__EXT__Unknown Data:0",
            sicilia: "266500,1525611,42593,__NEW__Unknown Data:0,__OLD__April 2020:335558;May 2020:68092;June 2020:225863;July 2020:104075;August 2020:10000;September 2020:48613;October 2020:166677,__EXT__October 2020:10154;March 2020:32439",
            toscana: "331128,563176,0,__NEW__Unknown Data:164600,__OLD__April 2019:109295;May 2019:2718;June 2019:43772;July 2019:105344;September 2019:37520;March 2020:22061;April 2020:28476;May 2020:52256;June 2020:25789;July 2020:61390;September 2020:59638;Unknown Data:13789,__EXT__Unknown Data:0",
            trentinoAA: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            umbria: "68811,97177,0,__NEW__June 2019:6000;March 2020:3905;June 2020:45000;July 2020:10000,__OLD__August 2018:88177;July 2020:9000,__EXT__Unknown Data:0",
            valleDA: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            veneto: "305454,560455,62500,__NEW__December 2018:183272,__OLD__November 2018:504409;April 2020:11565;May 2020:23720;June 2020:8450,__EXT__Unknown Data:0"
        },
        2018: {
            abruzzo: "87273,475085,0,__NEW__March 2020:10720;June 2020:24188,__OLD__December 2019:20400;January 2020:12240;March 2020:67437;April 2020:55076;September 2020:12800,__EXT__Unknown Data:0",
            basilicata: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            calabria: "0,341727,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            campania: "658944,1170462,130051,__NEW__April 2020:120000,__OLD__April 2020:143177,__EXT__April 2020:130051",
            emiliaR: "462589,1179419,52135,__NEW__February 2020:2300,__OLD__November 2019:50521;February 2020:1117161,__EXT__December 2019:20000",
            friuliVG: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            lazio: "336000,970854,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            liguria: "101202,326486,40856,__NEW__December 2019:50601,__OLD__Unknown Data:0,__EXT__December 2019:20428",
            lombardia: "2056979,1951289,498496,__NEW__February 2020:935523,__OLD__February 2020:959979,__EXT__February 2020:235829",
            marche: "174900,313626,35510,__NEW__March 2020:58300;July 2020:29150;August 2020:58300,__OLD__September 2019:62725;March 2020:62725;June 2020:50570;July 2020:31362;August 2020:31362,__EXT__September 2019:7102;March 2020:7102;June 2020:3551;July 2020:3551;August 2020:3551",
            molise: "52800,77159,0,__NEW__September 2020:52799,__OLD__October 2019:77159,__EXT__Unknown Data:0",
            piemonte: "446051,757910,0,__NEW__November 2019:312235,__OLD__November 2019:382283;December 2019:156171,__EXT__Unknown Data:0",
            puglia: "460676,830315,88090,__NEW__April 2020:102372;May 2020:20474,__OLD__April 2020:282123,__EXT__March 2020:38090",
            sardegna: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            sicilia: "266500,1525611,42593,__NEW__Unknown Data:0,__OLD__April 2020:335558;May 2020:68092;June 2020:225863;July 2020:104075;August 2020:10000;September 2020:48613;October 2020:166677,__EXT__October 2020:10154;March 2020:32439",
            toscana: "29521,1027231,0,__NEW__April 2020:23617,__OLD__March 2020:78470;April 2020:64075;May 2020:660862;ND.NDND:18376,__EXT__Unknown Data:0",
            trentinoAA: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            umbria: "90000,158532,0,__NEW__March 2020:27000,__OLD__January 2020:7413,__EXT__Unknown Data:0",
            valleDA: "0,0,0,__NEW__Unknown Data:0,__OLD__Unknown Data:0,__EXT__Unknown Data:0",
            veneto: "480466,1103736,0,__NEW__December 2019:288280,__OLD__November 2019:484337;Unknown Data:479759,__EXT__Unknown Data:0"
        }
    }
}

var dict = {
    abruzzo: 0,
    basilicata: 1,
    calabria: 2,
    campania: 3,
    emiliaR: 4,
    friuliVG: 5,
    lazio: 6,
    liguria: 7,
    lombardia: 8,
    marche: 9,
    molise: 10,
    piemonte: 11,
    puglia: 12,
    sardegna: 13,
    sicilia: 14,
    toscana: 15,
    trentinoAA: 16,
    umbria: 17,
    valleDA: 18,
    veneto: 19
}

var reverseDict = {
    0: "abruzzo",
    1: "basilicata",
    2: "calabria",
    3: "campania",
    4: "emiliaR",
    5: "friuliVG",
    6: "lazio",
    7: "liguria",
    8: "lombardia",
    9: "marche",
    10: "molise",
    11: "piemonte",
    12: "puglia",
    13: "sardegna",
    14: "sicilia",
    15: "toscana",
    16: "trentinoAA",
    17: "umbria",
    18: "valleDA",
    19: "veneto"
}

var dictToStr = {  
    abruzzo: "Abruzzo",
    basilicata: "Basilicata",
    calabria: "Calabria",
    campania: "Campania",
    emiliaR: "Emilia Romagna",
    friuliVG: "Friuli-Venezia Giulia",
    lazio: "Lazio",
    liguria: "Liguria",
    lombardia: "Lombardia",
    marche: "Marche",
    molise: "Molise",
    piemonte: "Piemonte",
    puglia: "Puglia",
    sardegna: "Sardegna",
    sicilia: "Sicilia",
    toscana: "Toscana",
    trentinoAA: "Trentino-Alto Adige",
    umbria: "Umbria",
    valleDA: "Valle d\'Aosta",
    veneto: "Veneto"
}