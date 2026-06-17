import { defineConfig } from 'jsrepo';
import { github } from 'jsrepo/providers';

export default defineConfig({
	// configure where stuff comes from here
	providers: [github()],
	registries: [
    "github/DavidHDev/react-bits"
],
	// configure where stuff goes here
	paths: {},
});