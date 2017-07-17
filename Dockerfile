FROM jupyter/datascience-notebook
MAINTAINER Ryo Koizumi <ryo.koizumi@soinn.com>

ENV HOME="/home/jovyan"
ENV USER="jovyan"

USER $USER

### vim_binding ここから ###
RUN mkdir -p $(jupyter --data-dir)/nbextensions && \
    cd $(jupyter --data-dir)/nbextensions && \
    git clone https://github.com/lambdalisue/jupyter-vim-binding vim_binding &&\
    jupyter nbextension enable vim_binding/vim_binding
RUN mkdir -p $HOME/.jupyter/custom
COPY vim_bindings_custom.js $HOME/.jupyter/custom/custom.js
### vim_binding ここまで ###

EXPOSE 8888
CMD ["start-notebook.sh", "--NotebookApp.token=''", "--NotebookApp.notebook_dir=/notebook"]
