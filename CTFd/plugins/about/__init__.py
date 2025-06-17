from flask import Blueprint, render_template

def load(app):
    about = Blueprint('about', __name__, template_folder='templates')
    
    @about.route('/about')
    def view_about():
        return render_template('about.html')
    
    app.register_blueprint(about) 