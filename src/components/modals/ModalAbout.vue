<template>
  <v-f-modal-layout>
    <div class="sm:flex sm:items-start">
      <div
          class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-50 dark:bg-gray-500 sm:mx-0 sm:h-10 sm:w-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 stroke-blue-600 dark:stroke-blue-100" fill="none"
             viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
      </div>
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
        <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-400" id="modal-title">
          {{ t('About %s', 'Vuefinder ' + version ) }}</h3>
        <div class="mt-2">

          <p class="text-sm text-gray-500">{{ t('Vuefinder is a file manager component for vue 3.') }}</p>
          <div>
            <h3 class="text-sm font-semibold mt-5 text-gray-900 dark:text-gray-400 tracking-wider">{{ t('Settings') }}</h3>
          </div>
          <div class="mt-3 text-left">
            <fieldset>
              <div class="space-y-2">
                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="dark_mode" name="dark_mode" v-model="darkMode" type="checkbox"
                           @click="handleDarkMode"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="dark_mode" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t("Dark Mode") }} <action-message class="ms-3" on="vf-darkMode-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>
                <div class="flex relative gap-x-3">
                  <div class="h-6 items-center">
                    <input id="metric_unit" name="metric_unit" type="checkbox"
                           v-model="metricUnits"
                           @click="handleMetricUnits"
                           class="h-4 w-4 rounded border-gray-300 text-indigo-600 dark:accent-slate-400 focus:ring-indigo-600">
                  </div>
                  <div class="flex-1 block text-sm">
                    <label for="metric_unit" class="flex w-full font-medium text-gray-900 dark:text-gray-400">
                      {{ t('Use Metric Units') }} <action-message class="ms-3" on="vf-metric-units-saved">{{ t('Saved.') }}</action-message>
                    </label>
                  </div>
                </div>

                <div class="flex relative gap-x-3" v-if="features.includes(FEATURES.LANGUAGE)">
                  <div class="h-6 items-center">
                    <div class="flex w-full font-medium text-gray-900 dark:text-gray-400 text-sm">
                      {{ t('Language') }}
                    </div>
                  </div>
                  <div class="flex text-sm">
                    <select v-model="locale" @change="changeLocale($event.target.value)"
                            class="w-full text-sm text-slate-500 border dark:border-gray-600 dark:text-neutral-50 dark:bg-gray-700 rounded">
                      <optgroup :label="t('Language')">
                        <option v-for="(language, code) in supportedLanguages" :value="code">{{ language }}</option>
                      </optgroup>
                    </select> <action-message class="ms-3" on="vf-language-saved">{{ t('Saved.') }}</action-message>
                  </div>
                </div>

                <button @click="clearLocalStorage" type="button" class="vf-btn vf-btn-secondary">
                  {{ t('Clear Local Storage') }}
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
    <template v-slot:buttons>
      <button type="button" @click="emitter.emit('vf-modal-close')" class="vf-btn vf-btn-secondary">
        {{ t('Close') }}
      </button>
    </template>
  </v-f-modal-layout>
</template>

<script>
export default {
  name: 'VFModalAbout'
};
</script>

<script setup>
import VFModalLayout from './ModalLayout.vue';
import {inject, ref} from 'vue';
import ActionMessage from "../ActionMessage.vue";
import {version} from './../../../package.json';
import { FEATURES } from '../features.js';

const emitter = inject('emitter');
const {getStore, clearStore} = inject('storage');
const adapter = inject('adapter');
const {t, changeLocale, locale} = inject('i18n');
const features = inject("features");

const props = defineProps({
  selection: Object,
  current: Object
});

const name = ref('');
const message = ref('');

const darkMode = inject('darkMode');

const clearLocalStorage = async () => {
  clearStore();
  location.reload();
};

const handleDarkMode = () => {
  emitter.emit('vf-darkMode-toggle');
  emitter.emit('vf-darkMode-saved');
}

const metricUnits = inject('metricUnits');

const handleMetricUnits = () => {
  emitter.emit('vf-metric-units-saved', !metricUnits.value);
}

const supportedLanguages = {
  en: 'English',
  fr: 'French (Français)',
  de: 'German (Deutsch)',
  fa: 'Persian (فارسی)',
  he: 'Hebrew (עִברִית)',
  hi: 'Hindi (हिंदी)',
  ru: 'Russian (Pусский)',
  sv: 'Swedish (Svenska)',
  tr: 'Turkish (Türkçe)',
  zhCN: 'Simplified Chinese (简体中文)',
  zhTW: 'Traditional Chinese (繁體中文)',
}

</script>
