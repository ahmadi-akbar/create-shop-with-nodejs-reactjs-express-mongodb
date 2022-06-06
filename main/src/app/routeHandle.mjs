import AdminRT from "#routes/admin/index";
import CustomerRT from "#routes/customer/index";
import PublicRT from "#routes/public/index";
import BoyRT from "#routes/boy/index";
import createError from "http-errors";

var routeHandle = (app) => {
    console.log('==> routeHandle');
    // res.status(200);
    var keys = Object.keys(PublicRT);
    keys.forEach((x) => {
        app.use("/" + x, PublicRT[x]);

    });
    keys = Object.keys(BoyRT);
    keys.forEach((x) => {
        app.use("/boy/" + x, BoyRT[x]);
    });
    keys = Object.keys(AdminRT);
    keys.forEach((x) => {
        app.use("/admin/" + x, AdminRT[x]);
    });
    keys = Object.keys(CustomerRT);
    keys.forEach((x) => {
        app.use("/customer/" + x, CustomerRT[x]);
    });
    // app.use("/customer/settings", CustomerRT.settings);

// catch 404 and forward to error handler
    app.use(function (req, res, next) {

        next(createError(404));
    });


// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get("env") === "development" ? err : {};

        // render the error page
        res.status(err.status || 500);
        if (err.status === 404) {
            res.redirect('/errors')

        } else
            res.render("error");
    });

};
export default routeHandle;