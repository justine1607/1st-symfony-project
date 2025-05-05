import '../styles/base.scss'
import { Application } from "stimulus"
import { definitionsFromContext } from "stimulus/webpack-helpers"

// Create an application instance
const application = Application.start()

// Automatically load all controllers in the "controllers" directory
const context = require.context('../controllers', true, /\.js$/)
application.load(definitionsFromContext(context))
