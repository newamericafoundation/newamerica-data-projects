import React from 'react';

import { colors } from "../../helper_functions/colors.js";

import { formatValue } from "../../helper_functions/format_value.js";

import FactBoxList from './FactBoxList.js';
import DataParagraph from './DataParagraph.js';
import SimpleMap from './SimpleMap.js';
import EmbeddedChart from './EmbeddedChart.js';

const d3 = require("d3");

const CalloutBoxDataElement = ({settings, data, fullDataObject}) => {
	switch (settings.type) {
		case 'chart':
			return <EmbeddedChart chartSettings={settings.chartSettings} data={data} fullDataObject={fullDataObject}/>

		case 'fact-box-list':
			return <FactBoxList variables={settings.factBoxVars} format={settings.format} data={data} />

		case 'paragraph':
			return <DataParagraph variable={settings.paragraphVar} data={data} />

		case 'simple-map':
			return <SimpleMap country={settings.country} latVar={settings.latVar} lngVar={settings.lngVar} data={data} />
	}
}

export default CalloutBoxDataElement;