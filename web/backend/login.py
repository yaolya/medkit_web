from flask import session, abort

def login_is_required(function):
        def wrapper(*args, **kwargs):
            if "user_id" not in session:
                return abort(401)
            else:
                return function()
        return wrapper