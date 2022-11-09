<template>
	<k-field
		class="k-deepl-field"
		:required="required"
		:disabled="disabled"
		:label="label"
	>
		<k-input
			class="k-deepl-input"
			:size="size"
			theme="field"
			:type="inputtype"
			:value="value"
			@input="setValue($event, 'value')"
		/>
		<k-button icon="import" :tooltip="$t('mountbatt.deepl.importhelp')" v-show="button.current_language != button.base_language" class="k-field-help deepl-button" @click="importOriginalValue">{{ $t('mountbatt.deepl.import') }} »{{ button.base_language.toUpperCase() }}«</k-button>
		<k-button icon="refresh" :tooltip="$t('mountbatt.deepl.translatenow')" v-show="button.current_language != button.base_language" class="k-field-help deepl-button" @click="doTranslation">{{ button.text.toUpperCase() }}</k-button>
	</k-field>
</template>

<script>
export default {
	props: {
		field_name: {
			type: String,
			required: true,		
		},
		page_id: {
			type: String,
			required: true,		
		},
		csrf: {
			type: String,
			required: true,		
		},
		api_key: {
			type: String,
			required: true,
		},
		api_url: {
			type: String,
			required: true,
		},
		label: String,
		required: Boolean,
		disabled: Boolean,
		inputtype: String,
		size: String,
		value: String,
		selected: String,
		default: {
			type: Object,
			default() {
				return {
					name: "",
				};
			},
		},
	},
	
	data() {
		const panel = document.querySelector(".k-panel");
		const current_language = panel.dataset.language;
		const base_language = panel.dataset.translation;
		return {
			error: null,
			button: {
				base_language: base_language,
				current_language: current_language,
				text: base_language + ' → ' + current_language,
			},
		};
	},

	
	computed: {
		
	},
	
	methods: {
		
		importOriginalValue() {
			const csrf = this.csrf;
			fetch("../api/pages/" + this.page_id, {
				method: "GET",
				headers: {
					"X-CSRF" : csrf
				}
			})
			.then(response => response.json())
			.then(response => {
				const page = response.data;
				// do something with the page data
				this.$emit("input", page.content[this.field_name])
			})
			.catch(error => {
				// something went wrong
			});
			
		
			
		},
		
		async doTranslation(evt, value) {
			//console.log(this.value)
			const panel = document.querySelector(".k-panel");
			const current_language = panel.dataset.language;
			const base_language = panel.dataset.translation; // alternative we can use baselang from props in index.php with this.base_language

			if (!evt) {
				alert("Error … No event")
				return;
			}
			
			try {
				const response = await fetch(
					this.api_url+'?auth_key='+this.api_key+'&preserve_formatting=1split_sentences=1&text='+encodeURIComponent(this.value)+'&target_lang='+current_language+'&source_lang='+base_language
				);
				const data = await response.json();
				console.log(data);
				this.error = null;
				this.value = data.translations[0].text
				this.$emit("input", data.translations[0].text);
				if (data.translations[0].text) {
					
				} else {
					this.error = data.message;
					console.log(data.message)
				}
			} catch (err) {
				//
			}
			
			
			
			
			
		},
		
		setValue(value) {
			this.error = null;
			this.$emit("input", value);
		},

	}, // methods end

};
</script>

<style lang="scss">
	@import '../assets/css/styles.scss'
</style>