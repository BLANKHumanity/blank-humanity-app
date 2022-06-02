import * as tf from '@tensorflow/tfjs';



import initiailizersMetadata from "../../../initializers-metadata-lookup.json";


const logInputData = (input) => {
  console.log(input);

  console.log("text : " + input.dataTransfer?.getData("text"));
  console.log("text/html : " + input.dataTransfer?.getData("text/html"));
  console.log("text/plain : " + input.dataTransfer?.getData("text/plain"));
  console.log(
    "text/uri-list : " + input.dataTransfer?.getData("text/uri-list")
  );
  console.log("URL : " + input.dataTransfer?.getData("URL"));
  console.log("application : " + input.dataTransfer?.getData("application"));
  console.log(
    "application/file : " + input.dataTransfer?.getData("application/file")
  );
  console.log(
    "application/x-moz-file : " +
      input.dataTransfer?.getData("application/x-moz-file")
  );
  console.log("image/png : " + input.dataTransfer?.getData("image/png"));
  console.log("image/jpeg : " + input.dataTransfer?.getData("image/jpeg"));
  console.log("image/gif : " + input.dataTransfer?.getData("image/gif"));
};

const extractUrl = (input) => {
  let imageUrl = input.dataTransfer?.getData("text")
    ? input.dataTransfer?.getData("text")
    : input.dataTransfer?.getData("URL"); // instead of 'Text'
  console.log(imageUrl);
  return imageUrl;
};
const extractFile = (input) => {
  let file = input.dataTransfer?.files[0];
  if (!file) file = input.currentTarget.files[0];
  return file;
};

const readImageFileData = async (imageFileData) => {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.readAsDataURL(imageFileData);
  });
};

function checkStringIsBase64Image(string) {
  return string.indexOf("data:image") != -1;
}

// Input may be
//   - Event data
//      - onDrag
//      - onSubmit
//      - onFileLoad
//   - Image data
//      - Base64
//      - Blob
const convertInputToImageData = async (input) => {
  logInputData(input);

  let imageUrl = extractUrl(input);
  let file = extractFile(input);

  if (imageUrl) {
    if (checkStringIsBase64Image(imageUrl)) {
      // Handle base64 image
      return imageUrl;
    } else {
      // Handle image URL

      //e.stopPropagation();
      input.preventDefault();

      // Handling drop from another site
      return fetch("https://blank-image-helper.herokuapp.com/" + imageUrl, {
        mode: "cors",
      })
        .then(async (response) => response.blob())
        .then(async (blob) => {
          return await readImageFileData(blob);
        });
    }
  } else {
    // Handle image file data
    // Handle direct file data
    // handling a file
    return await readImageFileData(file);
  }
};

/*
const reverseImage = (callback) => {
  return async (input) => {
    const imageData = await convertInputToImageData(input);
    const imageResult = await lookupImage(imageData);
    callback(imageResult[0], imageResult[1], imageResult[2], imageResult[3]);
  };
};
*/
const INITIALIZER_MODEL_CLASSES = ['0', '1', '10', '100', '101', '102', '103', '104', '105', '106', '107', '108', '109', '11', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '12', '120', '121', '122', '123', '124', '125', '126', '127', '128', '129', '13', '130', '131', '132', '133', '134', '135', '136', '137', '138', '139', '14', '140', '141', '142', '143', '144', '145', '146', '147', '148', '149', '15', '150', 
'151', '152', '153', '154', '155', '156', '157', '158', '159', '16', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '17', '170', '171', '172', '173', '174', 
'175', '176', '177', '178', '179', '18', '180', '181', '182', '183', '184', '185', '186', '187', '188', '189', '19', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '2', '20', '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '21', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '22', '220', '221', '222', '223', '224', '225', '226', '227', '228', '229', '23', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '24', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '25', '250', '251', '252', '253', '254', '255', '256', '257', '258', 
'259', '26', '260', '261', '262', '263', '264', '265', '266', '267', '268', '269', '27', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '28', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '29', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', '3', '30', '300', '301', '302', '303', '304', '305', '306', '307', '308', '309', '31', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '32', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '33', 
'330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '34', '340', '341', '342', '343', '344', '345', '346', '347', '348', '349', '35', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '36', '360', '361', '362', '363', '364', '365', '366', '367', '368', '369', '37', '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '38', '380', '381', '382', '383', '384', '385', '386', '387', '388', '389', '39', '390', '391', '392', '393', '394', '395', '396', '397', '398', '399', '4', '40', '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '41', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '42', '420', '421', '422', '423', '424', '425', '426', '427', '428', '429', '43', '430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '44', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '45', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459', '46', '460', '461', '462', '463', '464', '465', '466', '467', '468', '469', '47', '470', '471', '472', '473', '474', '475', '476', '477', '478', '479', '48', '480', '481', '482', '483', '484', '485', '486', '487', '488', '489', '49', '490', '491', 
'492', '493', '494', '495', '496', '497', '498', '499', '5', '50', '500', '501', '502', '503', '504', '505', '506', '507', '508', '509', '51', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '52', '520', '521', '522', '523', '524', '525', '526', '527', '528', '529', '53', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '54', '540', '541', '542', '543', '544', '545', '546', '547', '548', '549', '55', '550', '551', '552', '553', '554', '555', '556', '557', '558', '559', '56', '560', '561', '562', '563', '564', '565', '566', '567', '568', '569', '57', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '58', '580', '581', '582', '583', '584', '585', '586', '587', '588', '589', '59', '590', '591', '592', '593', '594', '595', '596', '597', '598', '599', '6', '60', '600', '601', '602', '603', '604', '605', '606', '607', '608', '609', '61', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '62', '620', '621', '622', '623', '624', '625', '626', '627', '628', '629', '63', '630', '631', '632', '633', '634', '635', '636', '637', '638', '639', '64', '640', '641', '642', '643', '644', '645', '646', '647', '648', '649', '65', '650', '651', '652', '653', '654', '655', '656', '657', '658', '659', '66', '660', '661', '662', '663', '664', '665', '666', '667', '668', '669', '67', '670', '671', '672', '673', '674', '675', '676', '677', '678', '679', '68', '680', '681', '682', '683', '684', '685', '686', '687', '688', '689', '69', '690', '691', '692', '693', '694', '695', '696', '697', '698', '699', '7', '70', '700', '701', '702', '703', '704', '705', '706', '707', 
'708', '709', '71', '710', '711', '712', '713', '714', '715', '716', '717', '718', '719', '72', '720', '721', '722', '723', '724', '725', '726', '727', '728', '729', '73', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '74', '740', '741', '742', '743', '744', '745', '746', '747', '748', '749', '75', '750', '751', '752', '753', '754', '755', '756', '757', '758', '759', '76', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769', '77', '770', '771', '772', '773', '774', '775', '776', '777', '778', '779', '78', '780', '781', '782', '783', '784', '785', '786', '787', '788', '789', '79', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799', '8', '80', '800', '801', '802', '803', '804', '805', '806', '807', '808', '809', '81', '810', '811', '812', '813', '814', '815', '816', '817', '818', '819', '82', '820', '821', '822', '823', '824', '825', '826', '827', '828', '829', '83', '830', '831', '832', '833', '834', '835', '836', '837', '838', '839', '84', '840', '841', '842', '843', '844', '845', '846', '847', '848', '849', '85', '850', '851', '852', '853', '854', '855', '856', '857', '858', '859', '86', '860', '861', '862', '863', '864', '865', '866', '867', '868', '869', '87', '870', '871', '872', '873', '874', '875', '876', '877', '878', '879', '88', '880', '881', '882', '883', '884', '885', '886', '887', '888', '889', '89', '890', '891', '892', '893', '894', '895', '896', '897', '898', '899', '9', '90', '900', '901', '902', '903', '904', '905', '906', '907', '908', '909', '91', '910', '911', '912', '913', '914', '915', '916', '917', '918', '919', '92', '920', '921', '922', '923', '924', '925', '926', '927', '928', '929', '93', '930', '931', '932', '933', '934', '935', '936', '937', '938', '939', '94', '940', '941', '942', '943', '944', '945', '946', '947', '948', '949', '95', '950', '951', '952', '953', '954', '955', '956', '957', '958', '959', '96', '960', '961', '962', '963', '964', '965', '966', '967', '968', '97', '98', '99'];

const reverseImage = (callback) => {
    return async (input) => {
      const imageData = await convertInputToImageData(input);

      
      let image = new Image();
      image.onload = async () => {
        const WIDTH = 128;
        const HEIGHT = 128;
        const topK = 5;
        const model = await tf.loadGraphModel('/blanket/collection-models/initializers-model/model.json');
  
        //const imageElement = document.getElementById("image");
        const inputImageTensor = tf.browser
          .fromPixels(image)
          .resizeBilinear([WIDTH, HEIGHT])
          .reshape([-1,WIDTH,HEIGHT,3]);
        const prediction = await model.predict(inputImageTensor).softmax();
  
        const sorted = true;
        const {values, indices} = tf.topk(prediction, topK, sorted);
  
        const classProbs = values.arraySync()[0];
        const classIndices = indices.arraySync()[0];
    
        const results = [];
        classIndices.forEach((classIndex, i) => {
          results.push({
            className: INITIALIZER_MODEL_CLASSES[parseInt(classIndex)],
            prob: classProbs[parseInt(i)]
          });
        });
  
        //alert(results[0].className+": "+results[0].prob);
  
        const foundNftId = results[0].className;
        const foundNftImageData = initiailizersMetadata[foundNftId][0].imageData;
  
        const similarImages = [];
        results.forEach((result) => {
          const nftId = result.className;
          similarImages.push({
            id: nftId, 
            imageData: initiailizersMetadata[nftId][0].imageData
          });
        });

        
        // nftID, collectionName, chainImage, similarImages
        callback(foundNftId, "0x881D9c2F229323aad28a9c9045111e30e1F1eB25", foundNftImageData, similarImages);
      }
      image.src = imageData;
    };
};

function onFileLoad(callback) {}

export default reverseImage;