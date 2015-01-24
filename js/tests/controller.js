function Controller_tests() {

}



Controller_tests.prototype.run_tests = function() {
    var result = "<strong>test 1(ifmo table src): </strong>" + this.run_ifmo_test() + "<br />" +
        "<strong>test 2(cats history src): </strong>" + this.run_cats_test() + "<br />";

    return result;
}

Controller_tests.prototype.models_equals = function(m, m2) {
    var result = JSON.stringify(m) == JSON.stringify(m2);
    return result ? "OK" :
        "FAIL <br />" + JSON.stringify(m) +
        " <br /><br /> " + JSON.stringify(m2) +
        " <br /><br /> ";
}

Controller_tests.prototype.acm_table_equals = function(m, m2) {
    m.throw_teams_with_no_solutions();
    m2.throw_teams_with_no_solutions();
    var result = JSON.stringify(m) == JSON.stringify(m2);
    return result ? "OK" :
    "FAIL <br />" + JSON.stringify(m) +
    " <br /><br /> " + JSON.stringify(m2) +
    " <br /><br /> ";
}

Controller_tests.prototype.run_ifmo_test = function() {
    var t = new Table_model();
    var a = new Ifmo_adapter(ifmo_html_data_for_test, t);
    t = a.get_model();
    var r = new Acm_rules(t);
    var h = r.translate_to_history();
    r.set_model(h);
    var t2 = r.translate_to_table();
    return this.acm_table_equals(t, t2);
}

Controller_tests.prototype.run_cats_test = function() {
    var h = new History_model(string_to_date("07.11.2014 18:33"), ["Second Best", "Customer support"]);
    var a = new Cats_adapter(cats_xml_data_for_test, h);
    h = a.get_model();
    var r = new Acm_rules(h);
    var t = r.translate_to_table();
    var h2 = r.set_model(t).translate_to_history();
    var t2 = r.set_model(h2).translate_to_table();
    return this.acm_table_equals(t, t2);
}