define([
  'summernote/base/core/func',
  'summernote/base/core/list',
  'summernote/base/core/dom'
], function (func, list, dom) {
  var LinkPopover = function (summernote) {
    var self = this;
    var ui = $.summernote.ui;

    var $note = summernote.layoutInfo.note;
    var $editingArea = summernote.layoutInfo.editingArea;
    var options = summernote.options;

    var $popover = ui.popover({
      className: 'note-link-popover'
    }).render();

    $editingArea.append($popover);

    this.initialize = function () {

      summernote.generateButtons($popover.find('.popover-content'), options.popover.link);

      $note.on('summernote.keyup summernote.mouseup summernote.change', function (customEvent, event) {
        self.update(event.target);
      }).on('summernote.scroll', function () {
        self.update(summernote.invoke('editor.restoreTarget'));
      });
    };

    this.posFromPlaceholder = function (placeholder) {
      var $placeholder = $(placeholder);
      var pos = $placeholder.position();
      var height = $placeholder.outerHeight(true); // include margin

      // popover below placeholder.
      return {
        left: pos.left,
        top: pos.top + height
      };
    };

    this.update = function (targetNode) {
      if (dom.isAnchor(targetNode)) {
        var $anchor = $popover.find('a');
        var href = $(targetNode).attr('href');
        var target = $(targetNode).attr('target');
        $anchor.attr('href', href).html(href);
        if (!target) {
          $anchor.removeAttr('target');
        } else {
          $anchor.attr('target', '_blank');
        }

        var pos = this.posFromPlaceholder(targetNode);
        $popover.css({
          display: 'block',
          left: pos.left,
          top: pos.top
        });
      } else {
        $popover.hide();
      }
    };

    this.hide = function () {
      $popover.hide();
    };
  };

  return LinkPopover;
});
