import { setupProject } from "../../viz_controller.js";

import { colors } from "../../helper_functions/colors.js";


let variables = {
	state_id: {"variable":"state_id", "displayName":"State Id", "format": "number"},
	state: {"variable":"state", "displayName":"State", "format": "string"},
	state_abbrev: {"variable":"state_abbrev", "displayName":"State", "format": "string"},
	min_ed_requirement: {"variable":"min_ed_requirement", "displayName":"Minimum Educational Requirement", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Bachelor's Degree", "Post-BA Degree or Coursework", "Master's Degree", "Post-MA Degree or Coursework"], "customRange": [colors.turquoise.very_light, colors.turquoise.light, colors.turquoise.medium, colors.turquoise.dark]},
	license_grade_span: {"variable":"license_grade_span", "displayName":"License Grade Span", "format": "string", "category":"Principals", "scaleType":"categorical", "canSplitCategory":true, "customDomain":["Elementary school principal license", "K-12 principal license", "PreK-12 principal license", "Varies based on program"], "customRange":[colors.turquoise.light, colors.blue.light, colors.purple.light, colors.grey.medium]},
	higher_ed_coursework: {"variable":"higher_ed_coursework", "displayName":"ECE Coursework", "format": "string", "category":"Principals", "scaleType":"categorical", "canSplitCategory":true, "customDomain":["Must Offer Early Learning Coursework","Must Offer Child Development Coursework", "No", "No data"], "customRange":[colors.turquoise.light, colors.blue.light, colors.red.light, colors.grey.medium]},
	clinical_experience: {"variable":"clinical_experience", "displayName":"Clinical Experience Requirement", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "No"], "customRange":[colors.turquoise.light, colors.red.light]},
	prior_teaching_experience: {"variable":"prior_teaching_experience", "displayName":"Teaching Experience Requirement", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "Yes, in Elementary Grades", "No"], "customRange":[colors.turquoise.light, colors.turquoise.medium, colors.red.light]},
	professional_learning: {"variable":"professional_learning", "displayName":"ECE Professional Learning", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "No", "No data"], "customRange":[colors.turquoise.light, colors.red.light, colors.grey.medium]},
	joint_professional_learning: {"variable":"joint_professional_learning", "displayName":"Joint Professional Learning", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "No", "No data"], "customRange":[colors.turquoise.light, colors.red.light, colors.grey.medium]},
	formal_evaluation: {"variable":"formal_evaluation", "displayName":"Formal Evaluation", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "No", "No data"], "customRange":[colors.turquoise.light, colors.red.light, colors.grey.medium]},
	track_principal_turnover: {"variable":"track_principal_turnover", "displayName":"Track Principal Turnover", "format": "string", "category":"Principals", "scaleType":"categorical", "customDomain":["Yes", "No", "No data"], "customRange":[colors.turquoise.light, colors.red.light, colors.grey.medium]},
	avg_salary: {"variable":"avg_salary", "displayName":"Average Salary", "format": "price", "category":"Principals", "scaleType":"quantize", "customRange":[colors.white, colors.turquoise.light, colors.turquoise.dark], "numBins":5},
	avg_salary_continuous_scale: {"variable":"avg_salary", "displayName":"Principals", "format": "price", "color": colors.turquoise.light},
	benefits: {"variable":"benefits", "displayName":"Benefits", "format": "string", "category":"Principals", "scaleType":"categorical", "canSplitCategory":true, "customDomain":["Offers All 3", "Offers 2 (Health Insurance and Pension/Retirement)", "State Did Not Report", "No Data"], "customRange":[colors.turquoise.light, colors.blue.light, colors.grey.medium, colors.grey.medium_light]},
	diversity_incentives: {"variable":"diversity_incentives", "displayName":"Diversity Incentives", "format": "string", "category":"Principals", "scaleType":"categorical", "canSplitCategory":true, "customDomain":["Financial Incentives", "Supports in Place", "No", "No data"], "customRange":[colors.turquoise.light, colors.blue.light, colors.red.light, colors.grey.medium]},

	cd_min_ed_requirement: {"variable":"cd_min_ed_requirement", "displayName":"Minimum Educational Requirement", "format": "string", "category":"Center Directors"},
	cd_ed_training_requirement: {"variable":"cd_ed_training_requirement", "displayName":"Education & Training Requirement", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["No Higher Ed/Training", "CDA or Less", "Some College Coursework", "At Least an Associate's", "Bachelor's Degree"], "customRange": [colors.turquoise.very_light, colors.turquoise.light, colors.turquoise.medium, colors.turquoise.dark, "#002C2A"]},
	cd_ed_training_requirement_source: {"variable":"cd_ed_training_requirement_source", "displayName":"Education & Training Requirement Source", "format": "string", "category":"Center Directors"},
	cd_prior_experience: {"variable":"cd_prior_experience", "displayName":"Prior Child Care Experience Requirement", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["Yes", "No"], "customRange": [colors.turquoise.light, colors.red.light]},
	cd_prior_experience_years: {"variable":"cd_prior_experience_years", "displayName":"Prior Child Care Experience Years", "format": "string", "category":"Center Directors"},
	cd_licensing_standard_qual_notes: {"variable":"cd_licensing_standard_qual_notes", "displayName":"Licensing Standard Qualifications", "format": "string", "category":"Center Directors"},
	cd_prior_experience_source: {"variable":"cd_prior_experience_source", "displayName":"Prior Experience Source", "format": "string", "category":"Center Directors"},
	cd_has_credential: {"variable":"cd_has_credential", "displayName":"Center Director Credential", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["Yes", "Yes - Required for Licensing", "No"], "customRange": [colors.turquoise.light, colors.turquoise.medium, colors.red.light]},
	cd_credential_required_for_licensing: {"variable":"cd_credential_required_for_licensing", "displayName":"Credential Required for Licensing", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["Yes", "No", "N/A"], "customRange": [colors.turquoise.light, colors.red.light, colors.grey.medium]},
	cd_credential_source: {"variable":"cd_credential_source", "displayName":"Credential Source", "format": "string", "category":"Center Directors"},
	cd_qris_different_tiers: {"variable":"cd_qris_different_tiers", "displayName":"QRIS Ties to Different Tiers", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["Yes", "No", "N/A"], "customRange": [colors.turquoise.light, colors.red.light, colors.grey.medium]},
	cd_qris_different_tiers_source: {"variable":"cd_qris_different_tiers_source", "displayName":"QRIS Tiers Source", "format": "string", "category":"Center Directors"},
	cd_qris_different_tiers_notes: {"variable":"cd_qris_different_tiers_notes", "displayName":"QRIS Tiers Notes", "format": "string", "category":"Center Directors"},
	cd_formal_evaluation: {"variable":"cd_formal_evaluation", "displayName":"Formal Evaluation", "format": "string", "category":"Center Directors", "scaleType":"categorical", "customDomain":["Yes", "No"], "customRange": [colors.turquoise.light, colors.red.light]},
	cd_formal_evaluation_source: {"variable":"cd_formal_evaluation_source", "displayName":"Formal Evaluation Requirement Source", "format": "string"},
	cd_avg_salary: {"variable":"cd_avg_salary", "displayName":"Average Salary", "format": "price", "category":"Center Directors", "scaleType":"quantize", "customRange":[colors.white, colors.turquoise.light, colors.turquoise.dark], "numBins":5},
	cd_avg_salary_continuous_scale: {"variable":"cd_avg_salary", "displayName":"Center Directors", "format": "price", "color": colors.blue.light},
	cd_avg_salary_source: {"variable":"cd_avg_salary_source", "displayName":"Average Salary Source", "format": "string", "category":"Center Directors"},
}

let vizSettingsList = [
	{
		id: "#early-ed-leaders__pre-service-map", 
		vizType: "topo_json_map",
		primaryDataSheet: "states",
		geometryType: "states",
		geometryVar: variables.state_id,
		stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "1", hoverOpacity: ".6"},
		filterVars: [ variables.min_ed_requirement, variables.license_grade_span, variables.higher_ed_coursework, variables.clinical_experience, variables.prior_teaching_experience, variables.cd_ed_training_requirement, variables.cd_prior_experience, variables.cd_has_credential],
		varDescriptionSheet: "states_variables",
		tooltipVars: [ variables.state, variables.min_ed_requirement, variables.license_grade_span, variables.higher_ed_coursework, variables.clinical_experience, variables.prior_teaching_experience, variables.cd_min_ed_requirement, variables.cd_ed_training_requirement, variables.cd_prior_experience, variables.cd_prior_experience_years, variables.cd_licensing_standard_qual_notes, variables.cd_has_credential, variables.cd_credential_required_for_licensing],
		tooltipShowOnly: "same category",
		legendSettings: {"orientation": "vertical-right", "showTitle": true},
		filterGroupSettings: {"hidden": false},
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__in-service-map", 
		vizType: "topo_json_map",
		primaryDataSheet: "states",
		geometryType: "states",
		geometryVar: variables.state_id,
		stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "1", hoverOpacity: ".6"},
		filterVars: [ variables.professional_learning, variables.joint_professional_learning, variables.cd_qris_different_tiers],
		tooltipVars: [ variables.state, variables.professional_learning, variables.joint_professional_learning, variables.formal_evaluation, variables.cd_qris_different_tiers, variables.cd_qris_different_tiers_notes, variables.cd_formal_evaluation],
		legendSettings: {"orientation": "vertical-right", "showTitle": true},
		filterGroupSettings: {"hidden": false},
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__retention-map", 
		vizType: "topo_json_map",
		primaryDataSheet: "states",
		geometryType: "states",
		geometryVar: variables.state_id,
		stroke: {"color": colors.white, "width":"1", "opacity": "1", "hoverColor": colors.white, "hoverWidth": "1", hoverOpacity: ".6"},
		filterVars: [ variables.track_principal_turnover, variables.avg_salary, variables.benefits, variables.cd_avg_salary],
		tooltipVars: [ variables.state, variables.track_principal_turnover, variables.avg_salary, variables.benefits, variables.diversity_incentives, variables.cd_avg_salary ],
		legendSettings: {"orientation": "vertical-right", "showTitle": true},
		filterGroupSettings: {"hidden": false},
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }		
	},
	{
		id: "#early-ed-leaders__min-ed-requirement", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.min_ed_requirement ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__license-grade-span", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.license_grade_span ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__higher-ed-coursework", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.higher_ed_coursework ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__clinical-experience", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.clinical_experience ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__prior-teaching-experience", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.prior_teaching_experience ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__cd-ed-training-requirement", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.cd_ed_training_requirement ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__cd-prior-experience", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.cd_prior_experience ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__cd-has-credential", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.cd_has_credential ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }

	},
	{
		id: "#early-ed-leaders__professional-learning", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.professional_learning ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__joint-professional-learning", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.joint_professional_learning ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__cd-qris-different-tiers", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.cd_qris_different_tiers ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__track-principal-turnover", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.track_principal_turnover ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		id: "#early-ed-leaders__benefits", 
		vizType: "category_breakdown",
		primaryDataSheet: "states",
		dotSettings: { "width": 30, "offset": 5},
		filterVars: [ variables.benefits ],
		labelVar: variables.state_abbrev,
		tooltipVars: [ variables.state ],
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		// add click to profile functionality and split charts
		id: "#early-ed-leaders__avg-salary",
		primaryDataSheet: "states",
		vizType: "comparative_dot_histogram",
		groupingVars: [ variables.avg_salary_continuous_scale ],
		labelVar: variables.state_abbrev,
		titleVar: variables.state,
		legendSettings: {"orientation": "horizontal-center"},
		clickToProfile: { "variable": variables.state.variable, "url": "https://www.newamerica.org/in-depth/pre-k-leaders/state-profile/?" }
	},
	{
		// add click to profile functionality and split charts
		id: "#early-ed-leaders__cd-avg-salary",
		primaryDataSheet: "states",
		vizType: "comparative_dot_histogram",
		groupingVars: [ variables.cd_avg_salary_continuous_scale ],
		labelVar: variables.state_abbrev,
		titleVar: variables.state,
		legendSettings: {"orientation": "horizontal-center"},
	}
]

let projectSettings = {
	dataUrl: "https://na-data-projects.s3.amazonaws.com/data/edpolicy/early_ed_leaders.json",
	downloadDataLink: "https://docs.google.com/spreadsheets/d/1Ojj6gLytFubMwoAC95lWhqwjA1X8D-CKuf1wFWkgtQE/",
	dataSheetNames:["states"],
	vizSettingsList: vizSettingsList
}

setupProject(projectSettings);

	