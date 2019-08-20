class Validator
{
    ValidateUsername(usernname)
    {
        if(usernname.length <= process.env.USERNAME_MAX && usernname.length >= process.env.USERNAME_MIN)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    ValidatePassword(password)
    {
        if(password.length <= process.env.PASSWORD_MAX_PLAIN && password.length >= process.env.PASSWORD_MIN)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    ValidateSchoolCode(code)
    {
        if(code == process.env.SCHOOL_CODE)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

module.exports = new Validator;