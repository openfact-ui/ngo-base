#!/usr/bin/groovy
@Library('github.com/fabric8io/fabric8-pipeline-library@master')
def utils = new io.fabric8.Utils()
def org = 'openfact-ui'
def repo = 'ngo-base'

nodejsNode{
  ws {
    git "https://github.com/${org}/${repo}.git"
    readTrusted 'release.groovy'
    sh "git remote set-url origin git@github.com:${org}/${repo}.git"
    def pipeline = load 'release.groovy'

    if (utils.isCI()){
      container('nodejs'){
        pipeline.ci()
      }
    } else if (utils.isCD()){
      def branch
      container('nodejs'){
          branch = utils.getBranch()
      }

      def published
      container('nodejs'){
        published = pipeline.cd(branch)
      }

      def releaseVersion
      container('nodejs'){
          releaseVersion = utils.getLatestVersionFromTag()
      }

      if (published){
        pipeline.updateDownstreamProjects(releaseVersion)
      }
    }
  }
}